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
  loading: {},
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
      .addCase(getReply.pending, (state, action) => {
        state.isLoading = true;
        state.allReply = {};
        state.loading[action.meta.arg] = true;
      })
      .addCase(getReply.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.allReply[action.meta.arg] = action.payload.data;
        state.loading[action.meta.arg] = false;
      })
      .addCase(getReply.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
        state.loading[action.meta.arg] = false;
      })
      .addCase(createReply.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReply.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.allReply[action.meta.arg.idPost] = [
          ...state.allReply[action.meta.arg.idPost],
          {
            ...action.payload.data,
            ...action.meta.arg.user,
          },
        ];
      })
      .addCase(createReply.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
      });
  },
});

export const { setReply } = postReplySlice.actions;
export default postReplySlice.reducer;
