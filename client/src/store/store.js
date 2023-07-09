import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { json } from "body-parser";

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
      if (state.pageDir === true) {
        document.documentElement.dir = "ltr";
        localStorage.setItem("dir", "ltr");
        localStorage.setItem("lan", "true");
      } else {
        document.documentElement.dir = "rtl";
        localStorage.setItem("dir", "rtl");
        localStorage.setItem("lan", "false");
        // console.log(document.querySelector('.logInLang').classList.add('RTL'));
        // console.log(document.querySelector('.logInLang').classList.add('RTL'))
      }
      // localStorage.setItem("lan", (!state.pageDir));
    },
  },
});
const initialTheme = { theme: false };
const ThemeSlice = createSlice({
  name: "Theme",
  initialState: initialTheme,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = !state.theme;
      // localStorage.setItem("lan", (!state.pageDir));
    },
  },
});

const store = configureStore({
  reducer: {
    PrimaryData: PrimaryDataSlice.reducer,
    changePageDir: PageDirSlice.reducer,
    Theme: ThemeSlice.reducer,
  },
});

export const PrimaryActions = PrimaryDataSlice.actions;
export const pageDirActions = PageDirSlice.actions;
export const ThemeAction = ThemeSlice.actions;
export default store;
