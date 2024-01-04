import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
  name: "currentTextSize",
  initialState: {
    textSize: "small", 
  },
  reducers: {
    setTextSize: (state, action) => {
      state.textSize = action.payload;
    },
  },
});

export const { setTextSize } = textSlice.actions;
export default textSlice.reducer;
