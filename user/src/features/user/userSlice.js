import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from './userService';
import {
  clearAuthStorage,
  getAuthUser,
  setAccessToken,
  setAuthUser,
  setRefreshToken,
} from '../../utils/authStorage';
import { notification } from 'antd';

// API: Register
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error) {
      notification.error({
        message: 'Failed to create account',
        description: `${error.response.data.message}.`,
        duration: '3'
      });
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// API: Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const data = await authService.login(userData);
      return data;
    } catch (error) {
      notification.error({
        message: 'Login failed',
        description: `${error.response.data.message}.`,
        duration: '3'
      });
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//API Login google
export const loginGoogle = createAsyncThunk(
  'auth/loginGoogle',
  async (thunkAPI) => {
    try {
      const data = await authService.loginGoogle();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


// API: Logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (thunkAPI) => {
    try {
      const response = await authService.logout();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// API: Update
export const updateUser = createAsyncThunk(
  'auth/update',
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
  'auth/reset',
  async (password, thunkAPI) => {
    try {
      return await authService.resetPassword(password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  message: '',
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
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
        state.message = '';
        state.createdUser = action.payload;
        notification.success({
          message: 'Account created successfully',
          description: 'Welcome. Please log in to continue.',
          duration: '3',
        });
        setTimeout(() => {
          window.location.assign('/login');
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
        state.message = '';
        state.user = action.payload;
        setAuthUser(state.user);
        setAccessToken(state.user.token);

        notification.success({
          message: 'Login successfully',
          description: 'Welcome back!',
          duration: '3',
        });
        setTimeout(() => {
          window.location.assign('/');
        }, 1000);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
        state.user = null;
      })
      //API: Login Google
      .addCase(loginGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = '';
        state.user = action.payload;
        setAuthUser(state.user);
        setAccessToken(state.user.token);

      })
      .addCase(loginGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.user = null;
      })

      // API: Logout
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = '';
        clearAuthStorage();
        state.user = null;
        if (state.user === null && state.message === '') {
          window.location.assign('/');
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
        state.isLoading = false;
        state.message = '';
        notification.success({
          message: 'Update profile successfully',
          description: 'Your account information has been updated.',
          duration: '3',
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
        state.message = '';
        notification.success({
          message: 'Update password successfully',
          description: 'Your password has been reset.',
          duration: '3',
        });
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
        notification.error({
          message: 'Failed to update password',
          description: 'Check if you have correctly input your current password.',
          duration: '3',
        });
      })
  },
});

export default authSlice.reducer;
