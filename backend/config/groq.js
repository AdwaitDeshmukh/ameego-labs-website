import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY_2,
});

export default groqClient;