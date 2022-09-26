// Reducer that changes the state based on the action

import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const allChatSlice = createSlice({
  name: 'allchat',
  initialState: {
    isLoading: false,
    success: null,
    error: null,
    allchat: {},
    // rows: ['Property Name', 'Student', 'imgUrl', 'Country, State', 'Bookings']
  },
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true;
      state.success = false
      state.error = null;
    },
    // updateRows: (state, action) => {
    //   state.rows = action.payload;
    // },
    setAllChats: (state, action) => {
      state.allchat = action.payload;
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

export const {
  startLoading,
  setAllChats,
  updateRows,
  setError,
} = allChatSlice.actions;

export const useSuccess =  () => useSelector(state => state.AllChat.success)
export const useIsLoading =  () => useSelector(state => state.AllChat.isLoading)
export const useAllChats =  () => useSelector(state => state.AllChat.allchat)
// export const useRows =  () => useSelector(state => state.Users.rows)

export default allChatSlice.reducer


