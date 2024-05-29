import axios from "axios";
import { getAuthUser } from "../../utils/authStorage";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
});

const register = async (userData) => {
  try {
    const response = await api.post('/api/user/register', userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const login = async (userData) => {
  try {
    const response = await api.post('/api/user/login', userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const loginGoogle = async () => {
  try {
    const response = await api.get('/login/success');
    return response.data.user;
  } catch (error) {
    handleError(error);
  }
};

const logout = async () => {
  try {
    const response = await api.get('/logout');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const update = async (updatedUserData) => {
  try {
    const user = getAuthUser();
    const response = await api.put('/api/user/updateProfile', updatedUserData, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const updateAvatar = async (data) => {
  try {
    const user = getAuthUser();
    const response = await api.put(`/user/updateAvatar/${user._id}`, data, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const resetPassword = async (resetPasswordData) => {
  try {
    const user = getAuthUser();
    const response = await api.put('/api/user/resetPassword', resetPasswordData, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  console.error("API call error:", error);
  if (error.response && error.response.data) {
    throw new Error(error.response.data.message || "An error occurred");
  } else if (error.request) {
    throw new Error("No response received from server");
  } else {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const authService = {
  register,
  login,
  loginGoogle,
  logout,
  update,
  updateAvatar,
  resetPassword,
};
