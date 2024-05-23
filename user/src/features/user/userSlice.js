import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import {
  clearAuthStorage,
  getAuthUser,
  setAccessToken,
  setAuthUser,
  setRefreshToken,
} from "../../utils/authStorage";
import { notification } from "antd";

// API: Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error) {
      notification.error({
        message: `${error.response.data.message}`,
      });
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// API: Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const data = await authService.login(userData);
      return data;
    } catch (error) {
      notification.error({
        message: `${error.response.data.message}`,
      });
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// API: Logout
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (refreshToken, thunkAPI) => {
    return;
  }
);

// API: Update
export const updateUser = createAsyncThunk(
  "auth/update",
  async (updatedUserData, thunkAPI) => {
    try {
      return await authService.update(updatedUserData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// API: Reset password
export const resetPass = createAsyncThunk(
  "auth/reset",
  async (password, thunkAPI) => {
    try {
      return await authService.resetPassword(password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  message: "",
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // API: Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.createdUser = action.payload;
        notification.success({
          message: "Successfully Register",
          duration: "1",
        });
        setTimeout(() => {
          window.location.assign("/login");
        }, 1000);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
        state.createdUser = null;
      })

      // API: Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.user = action.payload;
        setAuthUser(state.user);
        setAccessToken(state.user.token);
        setRefreshToken(state.user.refreshToken);
        notification.success({
          message: "Hello User",
          description: "Welcome to World-Wise Events!",
          duration: "1",
        });
        setTimeout(() => {
          window.location.assign("/");
        }, 1000);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
        state.user = null;
      })

      // API: Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        clearAuthStorage();
        state.user = null;
        if (state.user === null && state.message === "") {
          window.location.assign("/");
        }
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
      })

      // API: Update
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const user = getAuthUser();
        console.log(action.payload);
        state.isLoading = false;
        state.message = "";
        notification.success({
          message: "Update profile",
          description: "Update successfully",
          duration: "1",
        });
        state.user = { ...user, ...action.payload };
        setAuthUser(state.user);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
      })

      // API: Reset Password
      .addCase(resetPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        notification.success({
          message: "Update password",
          description: "Update successfully",
          duration: "1",
        });
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
      })
  },
});

export default authSlice.reducer;
