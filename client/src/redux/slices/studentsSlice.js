import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HOST } from "../../data";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudentsStatus",
  async () => {
    const url = `${HOST}/api/auth/students`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const data = await response.json();
    const dataStudents = data.map((elem) => ({ ...elem, isChecked: false }));
    return dataStudents;
  }
);

const initialState = {
  students: [],
  status: "loading",
};

const studentsSlice = createSlice({
  name: "getStudents",
  initialState,
  reducers: {
    setStudents(state, action) {
      state.students.map((elem) => {
        if (elem._id === action.payload) {
          return (elem.isChecked = !elem.isChecked);
        }
        return elem;
      });
    },
  },
  extraReducers: {
    [fetchStudents.pending]: (state) => {
      state.status = "loading";
      state.students = [];
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.students = action.payload;
      state.status = "success";
    },
    [fetchStudents.rejected]: (state) => {
      state.status = "error";
      state.students = [];
    },
  },
});

export const { setStudents } = studentsSlice.actions;

export default studentsSlice.reducer;
