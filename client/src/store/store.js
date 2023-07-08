import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
const initialDataState = { PrimaryData: [] };
const PrimaryDataSlice = createSlice({
  name: "PrimaryData",
  initialState: initialDataState,
  reducers: {
    addPrimayData: (state, action) => {
      state.PrimaryData.push(action.payload);
    },
  },
});

const initialLanConfig = { pageDir: true };
const PageDirSlice = createSlice({
  name: "PageDir",
  initialState: initialLanConfig,
  reducers: {
    changePageDir: (state, action) => {
      state.pageDir = !state.pageDir;
      // localStorage.setItem("lan", JSON.stringify(state.pageDir));
    },
  },
});

const store = configureStore({
  reducer: {
    PrimaryData: PrimaryDataSlice.reducer,
    changePageDir: PageDirSlice.reducer,
  },
});

export const PrimaryActions = PrimaryDataSlice.actions;
export const pageDirActions = PageDirSlice.actions;
export default store;
