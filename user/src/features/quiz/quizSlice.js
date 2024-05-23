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

const initialState = {
  questions: null,
  message: "",
  isLoading: false,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
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
      });
  },
});

export default quizSlice.reducer;