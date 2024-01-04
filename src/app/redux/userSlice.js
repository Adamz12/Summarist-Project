import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "emailLoginRef",
  initialState: { emailLoginRef: null },
  reducers: {
    setEmailLoginRef: (state, action) => {
      state.emailLoginRef = action.payload;
    },
  },
});

export const { setEmailLoginRef } = userSlice.actions;
export default userSlice.reducer;
