// Reducer that changes the state based on the action

import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export const propertySlice = createSlice({
  name: 'property',
  initialState: {
    isLoading: false,
    error: null,
    property: [],
    wishlist: [],
    propertyDetails: {},
    success: null,
    reviews: []
  },
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true;
      state.success = false
      state.error = null
    },
    setProperty: (state, action) => {
      state.property = action.payload;
      state.success = true;
      state.error = null;
      state.isLoading = false
    },
    updateProperty: (state, action) => {
      const { property_id, is_wish_listed } = action.payload; 
      const index = state.property.findIndex(p => p.id === property_id); 
      if(index>=0)
        state.property[index].is_wish_listed = is_wish_listed;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
      state.success = true;
      state.error = null;
      state.isLoading = false
    },
    setPropertyDetails: (state, action) => {
      state.propertyDetails = action.payload;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload;
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
  setProperty,
  updateProperty,
  setWishlist,
  setPropertyDetails,
  setReviews,
  setError
} = propertySlice.actions;

export const useSuccess =  () => useSelector(state => state.Property.success)
export const useProperty =  () => useSelector(state => state.Property.property)
export const useWishlist =  () => useSelector(state => state.Property.wishlist)
export const usePropertyDetails =  () => useSelector(state => state.Property.propertyDetails)
export const useReviews =  () => useSelector(state => state.Property.reviews)
export const useIsLoading =  () => useSelector(state => state.Property.isLoading)

export default propertySlice.reducer
