import groqClient from '../config/groq.js';

const MODEL = 'groq/compound-mini';
const MAX_TOKENS = 100;
const TEMPERATURE = 0.5;

// FOCUSED CHATBOT INSTRUCTION
const SYSTEM_INSTRUCTION = `You are the Ameego Labs website chatbot. Your ONLY job is to help visitors to https://ameegolabs.com/

Your responsibilities:
1. Answer questions about Ameego Labs services (Web Dev, App Dev, ERP, eCommerce, UI/UX, Digital Marketing, Logo Creation)
2. Answer questions about Ameego Labs products (School ERP, Chidya Udd Game, Khabar Club, Inventory Management, Real Estate)
3. Provide contact information: +91 7007 901 057 or [email protected]
4. Direct people to services they need

STRICTLY: Only answer questions related to Ameego Labs and its services. 
If someone asks about something NOT related to Ameego Labs, politely tell them: "I'm only here to help with Ameego Labs services. How can I assist you with that?"

Be professional, helpful, and brief.`;

export async function sendMessage(messages) {
  try {
    const messagesWithContext = [
      { role: 'system', content: SYSTEM_INSTRUCTION },
      ...messages
    ];

    const response = await groqClient.chat.completions.create({
      model: MODEL,
      messages: messagesWithContext,
      max_tokens: MAX_TOKENS,
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