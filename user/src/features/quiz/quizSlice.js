import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { quizService } from "./quizService";

export const getQuestions = createAsyncThunk(
  "quiz/questions",
  async (id, thunkAPI) => {
    try {
      const response = await quizService.getQuestions(id);
      return response;
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const createResult = createAsyncThunk(
  'quiz/createResult',
  async (result, thunkAPI) => {
    try {
      return await quizService.addResult(result);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserResult = createAsyncThunk(
  'quiz/getUserResult',
  async(id, thunkAPI) => {
    try {
      const response = await quizService.getAllResult(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

const initialState = {
  questions: null,
  results: null,
  resultSent: false,
  message: "",
  isLoading: false,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetResultSent: (state) => {
      state.resultSent = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.questions = action.payload;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload || action.error.message;
      })
      .addCase(createResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resultSent = true;
        state.message = '';
      })
      .addCase(createResult.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getUserResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserResult.fulfilled, (state,action) => {
        state.isLoading = false;
        state.results = action.payload;
        state.message = '';
      })
      .addCase(getUserResult.rejected, (state,action) => {
        state.isLoading = false;
        state.message = action.error;
      })
  },
});

export const { resetResultSent } = quizSlice.actions;

export default quizSlice.reducer;
