// Reducer that changes the state based on the action

import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    authToken: null,
    user: null,
    error: null,
    success: false,
    counter: 60
  },
  reducers: {
    startLogin: (state, action) => {
      state.isLoading = true;
      state.success = false
      state.error = null
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.success =false;
      state.isLoading = false;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
      state.success = true;
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.error = null;
      state.isLoading = false;
    },
    setCounter: (state, action) => {
      state.counter = action.payload;
      state.success = true;
      state.error = null;
      state.isLoading = false;
    },
    logoutUser: (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.authToken = null;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  startLogin,
  setSuccess,
  setError,
  setAuthToken,
  setUser,
  setCounter,
  logoutUser
} = authSlice.actions;

export const useAuhToken = () => useSelector((state) => state.Auth.authToken);
export const useUser = () => useSelector((state) => state.Auth.user);
export const useCounter = () => useSelector((state) => state.Auth.counter);
export const useIsLoading = () => useSelector((state) => state.Auth.isLoading);
export const useSuccess = () => useSelector((state) => state.Auth.success);
export const useError = () => useSelector((state) => state.Auth.error);

export default authSlice.reducer;
