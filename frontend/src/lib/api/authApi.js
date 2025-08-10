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