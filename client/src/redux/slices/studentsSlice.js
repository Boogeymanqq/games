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

export const fetchRemoveStudent = createAsyncThunk(
  "students/removeStudents",
  async (id) => {
    const url = `${HOST}/api/auth/delete/student`;
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify({ studentId: id }),
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    console.log("#deleteStudents", data);
  }
);

const initialState = {
  students: [],
  status: "loading",
};

const studentsSlice = createSlice({
  name: "students",
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
    removeStudent(state, action) {
      state.students = state.students.filter(
        (student) => student._id !== action.payload.id
      );
    },
    editStudent(state, action) {
      state.students = state.students.map((student) => ({
        ...student,
        isChecked:
          student._id === action.payload.id
            ? !student.isChecked
            : student.isChecked,
      }));
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

export const { setStudents, removeStudent, editStudent } =
  studentsSlice.actions;

export default studentsSlice.reducer;
