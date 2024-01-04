// loadingSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loginLoading: true,
  },
  reducers: {
    setLoginLoading: (state, action) => {
      state.loginLoading = action.payload;
    },
  },
});

export const { setLoginLoading } = loadingSlice.actions;

