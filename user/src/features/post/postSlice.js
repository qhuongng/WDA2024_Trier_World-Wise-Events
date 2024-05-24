import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postService } from "./postService";

export const getAllPosts = createAsyncThunk(
  "post/allPosts",
  async (idEvent, thunkAPI) => {
    try {
      return await postService.getListPost(idEvent);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createSinglePost = createAsyncThunk(
  "post/createPost",
  async (data, thunkAPI) => {
    try {
      return await postService.createPost(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  allPosts: null,
  isLoading: null,
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setPosts: (state, action) => {
      state.allPosts = action.payload || [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
        state.allPosts = [];
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.allPosts = action.payload.data;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(createSinglePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSinglePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.allPosts = [...state.allPosts, action.payload.data];
      })
      .addCase(createSinglePost.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
      });
  },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
