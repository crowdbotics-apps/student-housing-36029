// Reducer that changes the state based on the action

import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isLoading: false,
    error: null,
    profile: {},
    success: null
  },
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true;
      state.success = false
      state.error = null
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.error = null;
      state.isLoading = false
    },
    setProfileImage: (state, action) => {
      state.profile.image = action.payload;
      state.error = null;
      state.isLoading = false
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.success =false;
      state.isLoading = false;
    }
  },
  extraReducers: {}
})

  export const { startLoading, setProfile, setProfileImage, setError } = profileSlice.actions;

export const useSuccess =  () => useSelector(state => state.Profile.success)
export const useProfile =  () => useSelector(state => state.Profile.profile)
export const useIsLoading =  () => useSelector(state => state.Profile.isLoading)

export default profileSlice.reducer
