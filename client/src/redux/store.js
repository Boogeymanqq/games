import { configureStore } from "@reduxjs/toolkit";
import studentsSlice from "./slices/studentsSlice";

export const store = configureStore({
  reducer: {
    studentsSlice,
  },
});
