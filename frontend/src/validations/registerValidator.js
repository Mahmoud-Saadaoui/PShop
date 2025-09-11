import {
  validateEmail,
  validateName,
  validatePassword,
  validateRequired,
} from "./validators";

// Validates all fields for user registration forms
export const validateRegisterForm = ({ name, email, password }) => {
  let error = validateRequired(name, "Name");
  if (error) return error;

  error = validateRequired(email, "Email");
  if (error) return error;

  error = validateRequired(password, "Password");
  if (error) return error;

  error = validateName(name);
  if (error) return error;

  error = validateEmail(email);
  if (error) return error;

  error = validatePassword(password);
  if (error) return error;

  return null;
};