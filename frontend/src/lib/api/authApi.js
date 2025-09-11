import axios from "axios"
import summaryApi from "../../utils/urls"

export const loginApi = async (data) => {
  try {
    const res = await axios.post(summaryApi.auth.login, data)
    return res.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const registerApi = async (data) => {
  try {
    const res = await axios.post(summaryApi.auth.register, data)
    return res.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Get Current User Details
export const currentUserApi = async (accessToken) => {
  try {
    const res = await axios.get(summaryApi.auth.auth, { 
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true 
    });
    return res.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Verify Email
export const verifyEmailApi = async ({ userId, token }) => {
  const res = await axios.get(summaryApi.auth.verify(userId, token))
  return res.data
}