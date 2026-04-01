/**
 * Validate messages array
 * @param {any} messages - Messages to validate
 * @returns {Object} - {isValid: boolean, error: string}
 */
export function validateMessages(messages) {
  if (!messages) {
    return { isValid: false, error: 'Messages array is required' };
  }

  if (!Array.isArray(messages)) {
    return { isValid: false, error: 'Messages must be an array' };
  }

  if (messages.length === 0) {
    return { isValid: false, error: 'Messages array cannot be empty' };
  }

  // Validate each message
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    if (!msg.role || !msg.content) {
      return { 
        isValid: false, 
        error: `Message ${i} must have 'role' and 'content' properties` 
      };
    }

    if (!['user', 'assistant', 'system'].includes(msg.role)) {
      return { 
        isValid: false, 
        error: `Invalid role: ${msg.role}. Must be 'user', 'assistant', or 'system'` 
      };
    }

    if (typeof msg.content !== 'string') {
      return { 
        isValid: false, 
        error: `Message content must be a string` 
      };
    }
  }

  return { isValid: true };
}

/**
 * Sanitize user input
 * @param {string} input - User input
 * @returns {string} - Sanitized input
 */
export function sanitizeInput(input) {
  return input.trim().slice(0, 5000); // Limit to 5000 characters
}