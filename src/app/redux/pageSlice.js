import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const pageSlice = createSlice({
  name: "currentPage",
  initialState,
  reducers: {
    changePage: (state, action) => {
      return action.payload; 
    },
  },
});

export const { changePage } = pageSlice.actions;

export default pageSlice.reducer;






