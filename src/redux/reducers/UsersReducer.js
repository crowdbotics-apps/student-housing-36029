// Reducer that changes the state based on the action

import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: false,
    success: null,
    error: null,
    users: {},
    rows: ['Name Surname', 'Email', 'Phone Number', 'Country, State', 'Bookings']
  },
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true;
      state.success = false
      state.error = null;
    },
    updateRows: (state, action) => {
      state.rows = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
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
  setUsers,
  updateRows,
  setError,
} = userSlice.actions;

export const useSuccess =  () => useSelector(state => state.Users.success)
export const useIsLoading =  () => useSelector(state => state.Users.isLoading)
export const useUsers =  () => useSelector(state => state.Users.users)
export const useRows =  () => useSelector(state => state.Users.rows)

export default userSlice.reducer
