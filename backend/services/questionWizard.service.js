import groqClient from '../config/groq.js';
import { v4 as uuidv4 } from "uuid";
import Question from "../models/question.model.js";
import WizardSession from "../models/wizardSession.model.js";
import DiscussionSession from "../models/discussionSession.model.js";

const MODEL = 'groq/compound-mini';
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

const SUMMARY_INSTRUCTION = `
You maintain a concise list of confirmed user requirements.

RULES:
- Only include confirmed features or requirements
- Ignore questions, doubts, explanations
- Keep it short and clean
- Use bullet points

OUTPUT FORMAT:
- Feature 1
- Feature 2
`;

const CRD_INSTRUCTION = `
You are a senior business analyst.

Convert user inputs into a structured, implementation-ready Client Requirement Document (CRD).

RULES:
- Extract explicit and implicit requirements
- Remove ambiguity
- Make only reasonable assumptions
- Do NOT hallucinate features
- Be concise and clear

OUTPUT:
- Return STRICT valid JSON only
- No explanations, no markdown
- No extra fields

Follow the predefined CRD schema strictly.
`;

const DISCUSSION_INSTRUCTION = `
You are an AI consultant for Ameego Labs.

You are in DISCUSSION MODE.

Your role:
- Help refine the user's project requirements step-by-step
- Suggest improvements or additional features
- Keep responses short, clear, and conversational
- Ask follow-up questions to guide the user

STRICT RULES:
- Do NOT generate long reports
- Do NOT use tables or structured formatting
- Do NOT repeat full recommendations again
- Keep responses under 4–6 lines
- Focus on one idea at a time

STYLE:
- Friendly and professional
- Interactive (like a real consultant)
- Encourage clarification

EXAMPLE BEHAVIOR:
User: "I want analytics dashboard"

Response:
"That’s a great addition.

You can include user activity tracking and performance insights.

Do you want this dashboard for admin only or for users as well?"
`;

const RECOMMENDATION_INSTRUCTION = `
You are an expert AI consultant for Ameego Labs.

Your task:
- Analyze user requirements from a questionnaire
- Recommend the most suitable services offered by Ameego Labs
- Provide clear reasoning

STRICT RULES:
- Only recommend services relevant to Ameego Labs
- Do NOT mention proposals or documents
- Do NOT ask questions
- Do NOT generate long explanations
- Keep reasoning concise and professional

OUTPUT FORMAT (STRICT JSON ONLY):

{
  "services": [],
  "reasoning": "",
  "ui_sections": {
    "title": "Recommended Solution",
    "description": "",
    "highlights": []
  }
}

GUIDELINES:
- "services" → list of relevant services
- "reasoning" → 3–5 lines max
- "description" → short summary of solution
- "highlights" → key features/benefits

Do NOT return anything outside JSON.
`;

const CLASSIFIER_INSTRUCTION = `
You are an intent classifier.

Your job:
Determine if the user's message contains a PROJECT REQUIREMENT.

Return ONLY one word:
YES or NO

YES → if user is mentioning a feature, requirement, or something to include
NO → if user is asking a question, doubt, or general discussion
`;

export async function sendMessage(messages, instruction) {
    try {
        const messagesWithContext = [
            {
                role: 'system',
                content: instruction || SYSTEM_INSTRUCTION
            },
            ...messages
        ];

        const response = await groqClient.chat.completions.create({
            model: MODEL,
            messages: messagesWithContext,
            max_tokens: instruction?.includes("Client Requirement Document") ? 800 : 300,
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
        User requirements:

        ${formattedAnswers}

        Respond ONLY in JSON format.
    `;

    // 🔥 STEP 4: Call Groq
    const aiResponse = await sendMessage([
        { role: "user", content: userPrompt }
    ], RECOMMENDATION_INSTRUCTION);

    let parsed;

    try {
        parsed = JSON.parse(aiResponse);
    } catch {
        parsed = { raw: aiResponse };
    }

    // 🔥 STEP 5: Return AI response
    return {
        answers: enrichedAnswers,
        aiResponse: parsed
    };
};

export const startDiscussion = async (sessionId, initialAIResponse) => {
    if (!initialAIResponse) {
        throw new Error("Initial AI response required");
    }

    const formatted = `
        Recommended Services:
        ${initialAIResponse.services.join(", ")}

        Reason:
        ${initialAIResponse.reasoning}
    `;


    const discussion = await DiscussionSession.create({
        sessionId,
        messages: [
            {
                role: "assistant",
                content: formatted
            }
        ]
    });

    return discussion;
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

    // 🔥 Limit messages
    if (discussion.messages.length > 20) {
        discussion.messages.shift();
    }

    // ✅ Clean messages
    const cleanMessages = discussion.messages.map(msg => ({
        role: msg.role,
        content: msg.content
    }));

    // 🔥 Use discussion-specific AI behavior
    const aiResponse = await sendMessage(
        cleanMessages,
        DISCUSSION_INSTRUCTION
    );

    // ✅ Save AI response
    discussion.messages.push({
        role: "assistant",
        content: aiResponse
    });

    // 🔥 STEP: Incremental summary update

    const summaryPrompt = `
        You are updating a project requirement summary.

        CURRENT SUMMARY:
        ${discussion.summary || "No summary yet."}

        NEW USER MESSAGE:
        ${userMessage}

        TASK:
        Update the summary by including only relevant project requirements.

        IMPORTANT:
        - Only include confirmed features or requirements
        - Ignore questions, doubts, explanations
        - Keep it concise
        - Use bullet points

        OUTPUT FORMAT:
        - Feature 1
        - Feature 2
    `;

    if (await isRequirementMessage(userMessage)) {
        const updatedSummary = await sendMessage(
            [{ role: "user", content: summaryPrompt }],
            SUMMARY_INSTRUCTION
        );

        discussion.summary = updatedSummary;
    }
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
    const discussionText = discussion?.summary
        ? discussion.summary
        : "No additional discussion provided.";

    // 🔥 FINAL PROMPT
    const crdPrompt = `
        INPUT:

        1. Questionnaire Answers:
        ${formattedAnswers}

        2. Additional Discussion:
        ${discussionText || "No additional discussion provided."}

        ---

        Generate CRD using this JSON structure:

        {
        "project_overview": "",
        "goals_objectives": "",
        "features_required": [],
        "functional_requirements": {
            "authentication": "",
            "core_features": [],
            "admin_features": []
        },
        "technical_preferences": "",
        "non_functional_requirements": {
            "performance": "",
            "security": "",
            "scalability": ""
        },
        "timeline": "",
        "budget": "",
        "additional_notes": ""
        }
`;

    const aiResponse = await sendMessage([
        { role: "user", content: crdPrompt }
    ], CRD_INSTRUCTION);

    // 🔥 Parse JSON safely
    let parsed;
    try {
        parsed = JSON.parse(aiResponse);
    } catch (err) {
        parsed = { raw: aiResponse };
    }

    return parsed;
};

// Helper Functions
const isRequirementMessage = async (text) => {
    const lower = text.toLowerCase();

    // 🔹 Step 1: Fast check (cheap + fast)
    if (
        lower.includes("add") ||
        lower.includes("include") ||
        lower.includes("want") ||
        lower.includes("need")
    ) {
        return true;
    }

    // 🔹 Step 2: AI fallback (smart)
    try {
        const response = await sendMessage(
            [{ role: "user", content: text }],
            CLASSIFIER_INSTRUCTION
        );

        return response.trim().toUpperCase().includes("YES");
    } catch (err) {
        console.error("Classifier failed:", err.message);
        return false; // safe fallback
    }
};