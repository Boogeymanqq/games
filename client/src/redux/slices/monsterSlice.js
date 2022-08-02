import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HOST } from "../../data";

export const fetchMonster = createAsyncThunk(
  "monster/fetchMonsterStatus",
  async () => {
    const url = `${HOST}/api/monster/dir/monsterparts`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    const data = await response.json();
    return data;
  }
);

const initialState = {
  monsters: [],
  objMonsters: [],
  showFolder: true,
  status: "loading",
  changeTerminal: false,
};

const monsterSlice = createSlice({
  name: "getMonsters",
  initialState,
  reducers: {
    setObjMonsters(state, action) {
      state.monsters.map((elem) => {
        if (elem._id === action.payload) {
          state.showFolder = false;
          elem.img.map((item) =>
            state.objMonsters.push({ ...item, zIndexObj: 0 })
          );
        }
        return elem;
      });
    },
    setShowFolder(state) {
      state.showFolder = true;
    },
    setChangeTerminal(state) {
      state.changeTerminal = !state.changeTerminal;
    },
  },
  extraReducers: {
    [fetchMonster.pending]: (state) => {
      state.status = "loading";
      state.monsters = [];
    },
    [fetchMonster.fulfilled]: (state, action) => {
      state.monsters = action.payload;
      state.status = "success";
    },
    [fetchMonster.rejected]: (state) => {
      state.status = "error";
      state.monsters = [];
    },
  },
});

export const { setObjMonsters, setShowFolder, setChangeTerminal } =
  monsterSlice.actions;

export default monsterSlice.reducer;
