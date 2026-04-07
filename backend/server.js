import dotenv from 'dotenv';
import connectDB from "./config/db.js";

// LOAD .env FIRST - BEFORE any other imports
dotenv.config();

connectDB();

console.log('🔍 Checking API Key...');
console.log('GROQ_API_KEY exists:', process.env.GROQ_API_KEY ? '✅ YES' : '❌ NO');

import express from 'express';
import cors from 'cors';
import aiRoutes from './routes/ai.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/ai', aiRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Chat endpoint: http://localhost:${PORT}/api/ai/chat`);
});