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
      });
  },
});

export const { setReply } = postReplySlice.actions;
export default postReplySlice.reducer;
