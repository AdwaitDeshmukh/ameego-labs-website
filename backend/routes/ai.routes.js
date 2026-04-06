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

// TEMPORARY TEST ROUTE - remove after testing
router.get('/test-email', async (req, res) => {
    try {
        const { sendEmail } = await import('../services/emailService.js');
        
        await sendEmail({
            to: 'adwaitdeshmukh1121@gmail.com',  // put your email here
            subject: 'Test Email ✅',
            html: '<h1>It works!</h1><p>Nodemailer is set up correctly.</p>'
        });

        res.json({ success: true, message: 'Test email sent! Check your inbox.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;