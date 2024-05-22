import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { eventService } from "./eventService";

export const getAllEvents = createAsyncThunk(
  "event/allEvent",
  async (thunkAPI) => {
    try {
      return await eventService.getEvents();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPagedEvents = createAsyncThunk(
  "product/functionProduct",
  async (url, thunkAPI) => {
    try {
      return await eventService.getPagedEvents(url);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOneEvent = createAsyncThunk(
  "event/oneEvent",
  async (id, thunkAPI) => {
    try {
      return await eventService.getSingleEvent(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  singleEvent: null,
  allEvents: null,
  pagedEvents: null,
  message: "",
  isLoading: false,
};

export const eventSlice = createSlice({
  name: "event",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.allEvents = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getPagedEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPagedEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.pagedEvents = action.payload;
      })
      .addCase(getPagedEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(getOneEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.singleEvent = action.payload;
      })
      .addCase(getOneEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.error;
      });
  },
});

export default eventSlice.reducer;
