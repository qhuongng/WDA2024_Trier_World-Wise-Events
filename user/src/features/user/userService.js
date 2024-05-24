import axios from "axios";
import Cookies from "js-cookie";
import {
  getAuthUser
} from "../../utils/authStorage";

const register = async (userData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_API_URL}/user/register`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_API_URL}/user/login`,
    userData
  );
  if (response.data) {
    return response.data;
  }
};

const logout = async (refreshToken) => {
  Cookies.set("refreshToken", refreshToken);
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_API_URL}/user/logout`,
    {
      withCredentials: true,
    }
  );
  if (response.data) {
    return response.data;
  }
};

const update = async (updatedUserData) => {
  const user = getAuthUser();
  const response = await axios.put(
    `${process.env.REACT_APP_SERVER_API_URL}/user/updateProfile`,
    updatedUserData,
    {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    }
  );
  if (response.data) {
    return response.data;
  }
};

const resetPassword = async (resetPasswordData) => {
  const user = getAuthUser();
  const response = await axios.put(
    `${process.env.REACT_APP_SERVER_API_URL}/user/resetPassword`,
    resetPasswordData,
    {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    }
  );
  if (response.data) {
    return response.data;
  }
};


export const authService = {
  register,
  login,
  logout,
  update,
  resetPassword,
};
