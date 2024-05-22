import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { eventService } from "./eventService";

export const getAllEvents = createAsyncThunk(
  "event/allEvents",
  async (thunkAPI) => {
    try {
      return await eventService.getEvents();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getPagedEvents = createAsyncThunk(
  "event/pagedEvents",
  async (url, thunkAPI) => {
    try {
      return await eventService.getPagedEvents(url);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getGeoFormattedEvents = createAsyncThunk(
  "event/geoJsonEvents",
  async (url, thunkAPI) => {
    try {
      const events = await eventService.getPagedEvents(url);
      return events.data.map(event => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: event.location.map(Number) // Ensure coordinates are numbers
        },
        properties: {
          _id: event._id,
          eventName: event.eventName,
          city: event.city,
          country: event.country,
          startDate: event.startDate,
          endDate: event.endDate,
          images: event.images,
          isOngoing: event.isOngoing,
          id: event.id
        }
      }));
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
  geoJsonEvents: null,
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
      .addCase(getGeoFormattedEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGeoFormattedEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = "";
        state.geoJsonEvents = action.payload;
      })
      .addCase(getGeoFormattedEvents.rejected, (state, action) => {
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
