import { validateRequired } from "./validators";

// Validates email and password fields for login forms
export const validateLoginForm = ({ email, password }) => {
  let error = validateRequired(email, "Email");
  if (error) return error;

  error = validateRequired(password, "Password");
  if (error) return error;

  return null;
}