import { sendMessage } from '../services/chatService.js';
import { validateMessages } from '../utils/validation.js';

/**
 * Handle chat message endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export async function handleChat(req, res) {
  try {
    const { messages } = req.body;

    // Validate input
    const validation = validateMessages(messages);
    if (!validation.isValid) {
      return res.status(400).json({ 
        error: validation.error,
        message: 'Invalid message format'
      });
    }

    // Get response from Groq
    const response = await sendMessage(messages);

    // Send response back to client
    res.json({
      success: true,
      response: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Chat Controller Error:', error);
    res.status(500).json({
      error: error.message || 'An error occurred',
      message: 'Failed to process chat message'
    });
  }
}

/**
 * Health check endpoint
 */
export function healthCheck(req, res) {
  res.json({ 
    status: 'ok', 
    message: 'Chat service is healthy',
    timestamp: new Date().toISOString()
  });
}