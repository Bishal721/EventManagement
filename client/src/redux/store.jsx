import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import eventReducer from "./features/events/eventSlice";
import filterReducer from "./features/filter/filterSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer,
    filter: filterReducer,
  },
});

export { store };
