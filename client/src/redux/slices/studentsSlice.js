import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData, $HOST, GET_STUDENTS, DELETE_STUDENT } from "../../api-info";

//? асинхронная функция по запросу из БД данных студентов

export const fetchStudents = createAsyncThunk(
  "students/fetchStudentsStatus",
  async () => {
    const response = await getData($HOST, GET_STUDENTS, "GET");

    // в полученный массив данных добавляем необходимые свойства
    const dataStudents = response.map((elem) => ({
      ...elem,
      isChecked: false,
      edit: false,
      text: "",
    }));
    return dataStudents;
  }
);

//? асинхронная функция по удалению из БД данных студента

export const fetchRemoveStudent = createAsyncThunk(
  "students/removeStudents",
  async (id) => {
    const params = {
      body: JSON.stringify({ studentId: id }),
    };

    return await getData($HOST, DELETE_STUDENT, "DELETE", params);
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
