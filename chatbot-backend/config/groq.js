import Groq from 'groq-sdk';
import dotenv from 'dotenv';
//testing
dotenv.config();

const groqClient = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default groqClient;