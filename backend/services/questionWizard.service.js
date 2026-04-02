import groqClient from '../config/groq.js';
import { v4 as uuidv4 } from "uuid";
import Question from "../models/question.model.js";
import WizardSession from "../models/wizardSession.model.js";
import DiscussionSession from "../models/discussionSession.model.js";

const MODEL = 'groq/compound-mini';
const MAX_TOKENS = 100;
const TEMPERATURE = 0.5;

// FOCUSED CHATBOT INSTRUCTION
const SYSTEM_INSTRUCTION = `
You are an AI consultant for Ameego Labs.

Your role:
- Help refine user requirements
- Suggest improvements
- Recommend additional features
- Guide user toward best solution

Always stay focused on Ameego Labs services.

Be clear, professional, and helpful.
`;

export async function sendMessage(messages) {
    try {
        const messagesWithContext = [
            { role: 'system', content: SYSTEM_INSTRUCTION },
            ...messages
        ];
        const response = await groqClient.chat.completions.create({
            model: MODEL,
            messages: messagesWithContext,
            max_tokens: MAX_TOKENS,
            temperature: TEMPERATURE,
        });

        return response.choices[0]?.message?.content || 'No response generated';
    } catch (error) {
        console.error('Groq API Error:', error.message);
        throw new Error(`Failed to get response from Groq: ${error.message}`);
    }
}

export function getAvailableModels() {
    return ['groq/compound-mini', 'groq/compound'];
}

export const startWizard = async () => {
    const sessionId = uuidv4();

    const firstQuestion = await Question.findOne({ questionId: 1 });

    if (!firstQuestion) {
        throw new Error("First question not found");
    }

    await WizardSession.create({
        sessionId,
        answers: []
    });

    return {
        sessionId,
        question: firstQuestion
    };
};

export const answerQuestion = async ({ sessionId, questionId, answer }) => {
    const session = await WizardSession.findOne({ sessionId });

    if (!session) {
        throw new Error("Session not found");
    }

    if (session.status === "completed") {
        throw new Error("Session already completed");
    }

    // ✅ Get current question
    const currentQuestion = await Question.findOne({ questionId });

    if (!currentQuestion) {
        throw new Error("Question not found");
    }

    // 🔴 STEP 1: Validate correct flow (IMPORTANT)
    const lastAnswer = session.answers[session.answers.length - 1];

    let expectedQuestionId;

    if (!lastAnswer) {
        expectedQuestionId = 1;
    } else {
        const lastQuestion = await Question.findOne({
            questionId: lastAnswer.questionId
        });

        let nextId = null;

        if (lastQuestion.next) {
            if (typeof lastQuestion.next.get === "function") {
                nextId = lastQuestion.next.get(lastAnswer.answer);
            } else {
                nextId = lastQuestion.next[lastAnswer.answer];
            }
        }

        if (!nextId) {
            nextId = lastQuestion.defaultNext;
        }

        expectedQuestionId = nextId;
    }

    if (questionId !== expectedQuestionId) {
        throw new Error("Invalid question flow");
    }

    // 🔴 STEP 2: Validate answer
    if (currentQuestion.type === "select") {
        if (!currentQuestion.options.includes(answer)) {
            throw new Error("Invalid answer option");
        }
    }

    if (currentQuestion.type === "multi-select") {
        if (!Array.isArray(answer)) {
            throw new Error("Answer must be an array");
        }

        for (let ans of answer) {
            if (!currentQuestion.options.includes(ans)) {
                throw new Error("Invalid multi-select option");
            }
        }
    }

    // ✅ STEP 3: Save AFTER validation
    session.answers.push({ questionId, answer });
    await session.save();

    let nextQuestionId = null;

    if (currentQuestion.next) {
        if (typeof currentQuestion.next.get === "function") {
            // Map case
            nextQuestionId = currentQuestion.next.get(answer);
        } else {
            // Object case
            nextQuestionId = currentQuestion.next[answer];
        }
    }

    if (!nextQuestionId) {
        nextQuestionId = currentQuestion.defaultNext;
    }

    // ✅ STEP 4: Completion check
    if (!nextQuestionId) {
        return { completed: true };
    }

    // ✅ STEP 5: Fetch next question
    const nextQuestion = await Question.findOne({
        questionId: nextQuestionId
    });

    return {
        completed: false,
        nextQuestion
    };
};

export const completeWizard = async (sessionId) => {
    const session = await WizardSession.findOne({ sessionId });

    if (!session) {
        throw new Error("Session not found");
    }

    session.status = "completed";
    await session.save();

    const enrichedAnswers = [];

    for (const item of session.answers) {
        const question = await Question.findOne({
            questionId: item.questionId
        });

        enrichedAnswers.push({
            question: question.text,
            answer: item.answer
        });
    }

    // 🔥 STEP 3: Create prompt
    const formattedAnswers = enrichedAnswers
        .map((q, i) => `${i + 1}. ${q.question} → ${q.answer}`)
        .join("\n");

    const userPrompt = `
User has provided the following requirements:

${formattedAnswers}

Tasks:
1. Recommend the best Ameego Labs services
2. Explain why those services are suitable
3. Don't mention proposal related things if required add information for Client Requirement Document
`;

    // 🔥 STEP 4: Call Groq
    const aiResponse = await sendMessage([
        { role: "user", content: userPrompt }
    ]);

    // 🔥 STEP 5: Return AI response
    return {
        answers: enrichedAnswers,
        aiResponse
    };
};

export const startDiscussion = async (sessionId) => {
    // 🔥 Get latest wizard session
    const session = await WizardSession.findOne({ sessionId });

    if (!session) {
        throw new Error("Session not found");
    }

    // 🔥 Rebuild enriched answers (same as completeWizard)
    const enrichedAnswers = [];

    for (const item of session.answers) {
        const question = await Question.findOne({
            questionId: item.questionId
        });

        enrichedAnswers.push({
            question: question.text,
            answer: item.answer
        });
    }

    // 🔥 Build prompt again (same logic)
    const formattedAnswers = enrichedAnswers
        .map((q, i) => `${i + 1}. ${q.question} → ${q.answer}`)
        .join("\n");

    const userPrompt = `
User has provided the following requirements:

${formattedAnswers}

Tasks:
1. Recommend the best Ameego Labs services
2. Explain why those services are suitable
`;

    const aiResponse = await sendMessage([
        { role: "user", content: userPrompt }
    ]);

    // 🔥 Create discussion session
    const discussion = await DiscussionSession.create({
        sessionId,
        messages: [
            {
                role: "assistant",
                content: aiResponse
            }
        ]
    });

    return {
        aiResponse,
        discussion
    };
};

export const sendDiscussionMessage = async (sessionId, userMessage) => {
    const discussion = await DiscussionSession.findOne({ sessionId });

    if (!discussion) {
        throw new Error("Discussion not found");
    }

    // ✅ Add user message
    discussion.messages.push({
        role: "user",
        content: userMessage
    });

    // 🔥 Limit messages (prevent overflow)
    if (discussion.messages.length > 20) {
        discussion.messages.shift();
    }

    // ✅ Send full conversation to Groq
    const cleanMessages = discussion.messages.map(msg => ({
        role: msg.role,
        content: msg.content
    }));

    const aiResponse = await sendMessage(cleanMessages);

    // ✅ Save AI response
    discussion.messages.push({
        role: "assistant",
        content: aiResponse
    });

    await discussion.save();

    return aiResponse;
};

export const generateCRD = async (sessionId) => {
    const session = await WizardSession.findOne({ sessionId });
    const discussion = await DiscussionSession.findOne({ sessionId });

    if (!session) {
        throw new Error("Session not found");
    }

    // 🔹 Get wizard answers
    const enrichedAnswers = [];

    for (const item of session.answers) {
        const question = await Question.findOne({
            questionId: item.questionId
        });

        enrichedAnswers.push({
            question: question.text,
            answer: item.answer
        });
    }

    // 🔹 Format answers
    const formattedAnswers = enrichedAnswers
        .map((q, i) => `${i + 1}. ${q.question} → ${q.answer}`)
        .join("\n");

    // 🔹 Format discussion (IMPORTANT)
    let discussionText = "";

    if (discussion && discussion.messages.length > 0) {
        const cleanMessages = discussion.messages.map(msg => ({
            role: msg.role,
            content: msg.content
        }));

        discussionText = cleanMessages
            .map(m => `${m.role.toUpperCase()}: ${m.content}`)
            .join("\n");
    }

    // 🔥 FINAL PROMPT
    const crdPrompt = `
You are a professional business analyst.

Remember: 
- Use Rupees sign while express money

Based on the following:

1. User questionnaire answers:
${formattedAnswers}

2. Additional discussion:
${discussionText}

Generate a Client Requirement Document (CRD) in STRICT JSON format:

{
  "project_overview": "",
  "goals_objectives": "",
  "features_required": [],
  "technical_preferences": "",
  "timeline": "",
  "budget": "",
  "additional_notes": ""
}
  Respond ONLY in valid JSON. No explanation. No extra text.
`;

    const aiResponse = await sendMessage([
        { role: "user", content: crdPrompt }
    ]);

    // 🔥 Parse JSON safely
    let parsed;
    try {
        parsed = JSON.parse(aiResponse);
    } catch (err) {
        parsed = { raw: aiResponse };
    }

    return parsed;
};