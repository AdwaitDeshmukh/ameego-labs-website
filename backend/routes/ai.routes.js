import express from 'express';
import { handleChat, healthCheck } from '../controllers/chatController.js';
import { questionWizard, start, answer, complete, discussMessage, discussStart, generateCRDController } from '../controllers/questionWizard.js';
import { sendCRDController, acknowledgeController } from '../controllers/emailController.js';

const router = express.Router();

router.post('/chatbot', handleChat);
router.get('/health', healthCheck);

router.post('/wizard', questionWizard)
router.get("/wizard/start", start);
router.post("/wizard/answer", answer);
router.post("/wizard/complete", complete);
router.post("/wizard/discuss/start", discussStart);
router.post("/wizard/discuss/message", discussMessage);
router.post("/wizard/generate-crd", generateCRDController);
router.post("/wizard/send-crd", sendCRDController);
router.get("/wizard/acknowledge/:sessionId", acknowledgeController);

export default router;