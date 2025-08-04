export const validateRequiredFields = (body, requiredFields) => {
  for (const field of requiredFields) {
    if (!body[field] && body[field] !== 0) {
      return `${field} is required.`;
    }
  }
  return null; 
};