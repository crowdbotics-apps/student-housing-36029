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
    wishlistUpdated: false,
    reviews: [],
    propertyConfig: {},
    propertyFilters: {},
    houseRules: []
  },
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true;
      state.success = false
      state.error = null;
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
      state.isLoading = false;
      state.wishlistUpdated = false;
    },
    setWishlistUpdated: (state, action) => {
      state.wishlistUpdated = action.payload;
    },
    setPropertyDetails: (state, action) => {
      state.propertyDetails = action.payload;
    },
    setConfig: (state, action) => {
      state.propertyConfig = action.payload;
    },
    setFilters: (state, action) => {
      state.propertyFilters = action.payload;
    },
    setReviews: (state, action) => {
      state.reviews = action.payload;
      state.error = null;
      state.isLoading = false
    },
    setHouseRules: (state, action) => {
      state.houseRules.push(action.payload);
      state.error = null;
      state.isLoading = false
    },
    editHouseRules: (state, action) => {
      const updatedRule = action.payload;
      const index = state.houseRules.findIndex(r => r.id === updatedRule.id); 
      if (updatedRule.rule) {
        state.houseRules[index].name = updatedRule.rule.name;
      } else {
        state.houseRules.splice(index, 1);
      }
      state.error = null;
      state.isLoading = false
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.success =false;
      state.isLoading = false;
      state.property = []
    }
  },
  extraReducers: {}
})

export const {
  startLoading,
  setProperty,
  updateProperty,
  setWishlist,
  setWishlistUpdated,
  setPropertyDetails,
  setReviews,
  setConfig,
  setFilters,
  setHouseRules,
  editHouseRules,
  setError
} = propertySlice.actions;

export const useSuccess =  () => useSelector(state => state.Property.success)
export const useProperty =  () => useSelector(state => state.Property.property)
export const usePropertyConfig =  () => useSelector(state => state.Property.propertyConfig)
export const useFilters =  () => useSelector(state => state.Property.propertyFilters)
export const useWishlist =  () => useSelector(state => state.Property.wishlist)
export const useWishlistUpdated =  () => useSelector(state => state.Property.wishlistUpdated)
export const usePropertyDetails =  () => useSelector(state => state.Property.propertyDetails)
export const useReviews =  () => useSelector(state => state.Property.reviews)
export const useHouseRules =  () => useSelector(state => state.Property.houseRules)
export const useIsLoading =  () => useSelector(state => state.Property.isLoading)

export default propertySlice.reducer
