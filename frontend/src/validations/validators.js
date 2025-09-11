// Regex Patterns
const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ0-9 .-]*$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;

//  Fields Validation
export const validateRequired = (value, fieldName = "Field") => {
  if (!value || value.trim() === "") {
    return `⚠️ ${fieldName} is required!`;
  }
  return null;
};

export const validateName = (name) => {
  if (!nameRegex.test(name)) {
    return "❗ Please enter a valid name";
  }
  return null;
};

export const validateEmail = (email) => {
  if (!emailRegex.test(email)) {
    return "❗ Please enter a valid email";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!passwordRegex.test(password)) {
    return "🔒 Password must be 8–20 characters and include letters and numbers";
  }
  return null;
};