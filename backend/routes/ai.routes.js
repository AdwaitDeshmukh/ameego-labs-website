import express from 'express';
import { handleChat, healthCheck } from '../controllers/chatController.js';
import { questionWizard, start, answer, complete, discussMessage, discussStart, generateCRDController } from '../controllers/questionWizard.js';

const router = express.Router();

// Chatbot Route
// POST /api/chat - Send a message and get response
router.post('/chatbot', handleChat);
// GET /api/chat/health - Health check
router.get('/health', healthCheck);

//Question Wizard Routes
router.post('/wizard', questionWizard)
router.get("/wizard/start", start);
router.post("/wizard/answer", answer);
router.post("/wizard/complete", complete);
router.post("/wizard/discuss/start", discussStart);
router.post("/wizard/discuss/message", discussMessage);
router.post("/wizard/generate-crd", generateCRDController);

export default router;