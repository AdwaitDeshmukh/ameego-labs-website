import express from 'express';
import { handleChat, healthCheck } from '../controllers/chatController.js';

const router = express.Router();

// POST /api/chat - Send a message and get response
router.post('/', handleChat);

// GET /api/chat/health - Health check
router.get('/health', healthCheck);

export default router;