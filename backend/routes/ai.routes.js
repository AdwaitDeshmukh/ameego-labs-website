import express from 'express';
import { handleChat, healthCheck } from '../controllers/chatController.js';
import { questionWizard } from '../controllers/questionWizard.js';

const router = express.Router();

// Chatbot Route
// POST /api/chat - Send a message and get response
router.post('/chatbot', handleChat);
// GET /api/chat/health - Health check
router.get('/health', healthCheck);

//Question Wizard Routes
router.post('/question-wizard', questionWizard)


export default router;