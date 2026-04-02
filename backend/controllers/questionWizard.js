import { sendMessage, startWizard, answerQuestion, completeWizard, startDiscussion, sendDiscussionMessage, generateCRD } from '../services/questionWizard.service.js';
import { validateMessages } from '../utils/validation.js';

export const questionWizard = async (req, res) => {
    try {

    } catch (error) {
        console.error('Chat Controller Error:', error);
        res.status(500).json({
            error: error.message || 'An error occurred',
            message: 'Failed to process chat message'
        });
    }
}

export const start = async (req, res, next) => {
    try {
        const data = await startWizard();
        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const answer = async (req, res, next) => {
    try {
        const { sessionId, questionId, answer } = req.body;

        const data = await answerQuestion({
            sessionId,
            questionId,
            answer
        });

        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const complete = async (req, res, next) => {
    try {
        const { sessionId } = req.body;

        const data = await completeWizard(sessionId);

        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const discussStart = async (req, res, next) => {
    try {
        const { sessionId, initialAIResponse } = req.body;

        const data = await startDiscussion(sessionId, initialAIResponse);

        res.json(data);
    } catch (error) {
        next(error);
    }
};

export const discussMessage = async (req, res, next) => {
    try {
        const { sessionId, message } = req.body;

        const aiResponse = await sendDiscussionMessage(sessionId, message);

        res.json({ response: aiResponse });
    } catch (error) {
        next(error);
    }
};

export const generateCRDController = async (req, res, next) => {
    try {
        const { sessionId } = req.body;

        const crd = await generateCRD(sessionId);

        res.json(crd);
    } catch (error) {
        next(error);
    }
};