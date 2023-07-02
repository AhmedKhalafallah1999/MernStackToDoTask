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

const store = configureStore({
  reducer: {
    PrimaryData: PrimaryDataSlice.reducer,
  },
});

export const PrimaryActions = PrimaryDataSlice.actions;
export default store;
