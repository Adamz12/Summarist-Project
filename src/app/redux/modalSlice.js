import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modals",
  initialState: {
    isLoginModalOpen: false,
    isSignUpModalOpen: false,
  },
  reducers: {
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginModalOpen = false;
    },
    openSignUpModal: (state) => {
      state.isSignUpModalOpen = true;
    },
    closeSignUpModal: (state) => {
      state.isSignUpModalOpen = false;
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openSignUpModal,
  closeSignUpModal,
} = modalSlice.actions;

export const selectModals = (state) => state.modals;

export default modalSlice.reducer;
