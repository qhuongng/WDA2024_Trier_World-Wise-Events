import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postReplyService } from "./postReplyService";

export const getReply = createAsyncThunk(
  "postReply/getReply",
  async (idPost, thunkAPI) => {
    try {
      return await postReplyService.getPostReply(idPost);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createReply = createAsyncThunk(
  "postReply/createReply",
  async (data, thunkAPI) => {
    try {
      return await postReplyService.createPostReply(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  allReply: {},
  isLoading: null,
  // pagedEvents: null,
  // message: "",
};

export const postReplySlice = createSlice({
  name: "postReply",
  initialState: initialState,
  reducers: {
    setReply: (state, action) => {
      state.allReply = action.payload ?? {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReply.pending, (state) => {
        state.isLoading = true;
        state.allReply = {};
      })
      .addCase(getReply.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.allReply[action.meta.arg] = action.payload.data;
      })
      .addCase(getReply.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(createReply.pending, (state) => {
        state.isLoading = true;
        state.allReply = {};
      })
      .addCase(createReply.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.allReply[action.meta.arg] = action.payload.data;
      })
      .addCase(createReply.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
      });
  },
});

export const { setReply } = postReplySlice.actions;
export default postReplySlice.reducer;
