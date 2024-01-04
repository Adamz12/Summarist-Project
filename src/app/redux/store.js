"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import modalSlice from "./modalSlice";
import pageSlice from "./pageSlice";
import textSlice from "./textSlice";
import userSlice from "./userSlice";
import sidebarSlice from "./sidebarSlice";
import loadingSlice from "./loadingSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  debug: true,
};

const rootReducer = combineReducers({
  emailLoginRef: userSlice,
  modals: modalSlice,
  currentPage: pageSlice,
  textSize: textSlice,
  sidebar: sidebarSlice,
  loading: loadingSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
