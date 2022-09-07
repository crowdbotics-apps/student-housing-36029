// Reducer that changes the state based on the action

import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isLoading: false,
    error: null,
    profile: {},
    success: null,
    reviews: [],
    reviewsResponse: {},
    paymentMethods: [],
    bookingHistory: [],
    profilePreview: {}
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
      state.profile.profile_image_url = action.payload;
      state.error = null;
      state.isLoading = false
    },
    setReviews: (state, action) => {
      state.reviews = action.payload;
      state.error = null;
      state.isLoading = false
    },
    setReviewResponse: (state, action) => {
      state.reviewsResponse = action.payload;
      state.error = null;
      state.isLoading = false
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethods = action.payload;
      state.error = null;
      state.isLoading = false
    },
    setBookingHistory: (state, action) => {
      state.bookingHistory = action.payload;
      state.error = null;
      state.isLoading = false
    },
    setProfilePreview: (state, action) => {
      state.profilePreview = action.payload;
      state.error = null;
      state.isLoading = false
    },
    setShouldRateOwner: (state, action) => {
      state.profilePreview.should_rate_owner = action.payload;
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
  setProfile,
  setProfileImage,
  setReviews,
  setReviewResponse,
  setPaymentMethod,
  setBookingHistory,
  setProfilePreview,
  setShouldRateOwner,
  setError
} = profileSlice.actions;

export const useSuccess =  () => useSelector(state => state.Profile.success)
export const useProfile =  () => useSelector(state => state.Profile.profile)
export const useReviews =  () => useSelector(state => state.Profile.reviews)
export const useReviewResponse =  () => useSelector(state => state.Profile.reviewsResponse)
export const usePaymentMethod =  () => useSelector(state => state.Profile.paymentMethods)
export const useBookingHistory =  () => useSelector(state => state.Profile.bookingHistory)
export const useProfilePreview =  () => useSelector(state => state.Profile.profilePreview)
export const useIsLoading =  () => useSelector(state => state.Profile.isLoading)

export default profileSlice.reducer
