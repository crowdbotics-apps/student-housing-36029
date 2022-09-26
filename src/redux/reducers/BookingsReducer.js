// Reducer that changes the state based on the action

import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    isLoading: false,
    success: null,
    error: null,
    booking: {},
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
    setBookings: (state, action) => {
      state.booking = action.payload;
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
  setBookings,
  updateRows,
  setError,
} = bookingSlice.actions;

export const useSuccess =  () => useSelector(state => state.Bookings.success)
export const useIsLoading =  () => useSelector(state => state.Bookings.isLoading)
export const useBookings =  () => useSelector(state => state.Bookings.booking)
// export const useRows =  () => useSelector(state => state.Users.rows)

export default bookingSlice.reducer


