import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import eventService from "./eventService";

const initialState = {
  Event: null,
  events: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (formData, thunkAPI) => {
    try {
      return await eventService.createEvent(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getEvents = createAsyncThunk(
  "event/getEvents",
  async (_, thunkAPI) => {
    try {
      return await eventService.getEvents();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSingleEvent = createAsyncThunk(
  "event/getSingleEvent",
  async (id, thunkAPI) => {
    try {
      return await eventService.getSingleEvent(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await eventService.updateEvent(id, formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteEvent = createAsyncThunk("event/deleteEvent", async (id) => {
  try {
    return await eventService.deleteEvent(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.events.push(action.payload);
        toast.success("Event Created Successful");
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(getSingleEvent.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getSingleEvent.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.Event = actions.payload;
      })
      .addCase(getSingleEvent.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
        toast.error(actions.payload);
      }) //Update Package
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Event Updated Successfully");
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      // Delete Packages
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.events = state.events.filter(
          (Event) => Event._id !== action.payload
        );
        toast.success("Package Deleted Successfully");
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      });
  },
});

export const {} = eventSlice.actions;
export const selectEvent = (state) => state.event.Event;
export const selectIsLoading = (state) => state.event.isLoading;
export default eventSlice.reducer;
