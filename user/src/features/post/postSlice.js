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

// export const getPagedEvents = createAsyncThunk(
//   "post/functionProduct",
//   async (url, thunkAPI) => {
//     try {
//       return await postService.getPagedEvents(url);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

// export const getOneEvent = createAsyncThunk(
//   "post/oneEvent",
//   async (id, thunkAPI) => {
//     try {
//       console.log(id);
//       return await postService.getSingleEvent(id);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

const initialState = {
  allPosts: null,
  // pagedEvents: null,
  // message: "",
  // isLoading: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.allPosts = action.payload.data;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
      });
  },
});

export default postSlice.reducer;
