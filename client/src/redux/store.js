import { configureStore } from "@reduxjs/toolkit";
import studentsSlice from "./slices/studentsSlice";
import monsterSlice from "./slices/monsterSlice";

export const store = configureStore({
  reducer: {
    studentsSlice,
    monsterSlice,
  },
});
