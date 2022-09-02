// Reducer that changes the state based on the action

import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { isImage } from '../../utilities/utils';

export const ownerSlice = createSlice({
  name: 'owner',
  initialState: {
    isLoading: false,
    error: null,
    property: [],
    propertyDetails: {},
    propertyForm: {},
    formErrors: {},
    success: null,
    createSuccess: null,
    updateSuccess: null,
    reviews: [],
    houseRules: [],
    media: { photos: [], videos: [] },
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
      state.isLoading = false;
    },
    addProperty: (state, action) => {
      state.property.push(action.payload);
      state.createSuccess = true;
      state.error = null;
      state.isLoading = false
    },
    updatePropertyList: (state, action) => {
      const { id, property } = action.payload; 
      const index = state.property.findIndex(p => p.id === id); 
      if(index>=0)
        state.property[index] = property;
      state.updateSuccess = true;
      state.error = null;
      state.isLoading = false
    },
    setPropertyDetails: (state, action) => {
      state.propertyDetails = action.payload;
      state.houseRules = state.propertyDetails.housing_rules;
      state.media.photos = state.propertyDetails.media.filter(item => isImage(item.property_media?.split('?')[0]));
      state.media.videos = state.propertyDetails.media.filter(item => !isImage(item.property_media?.split('?')[0]));
    },
    setPhotos: (state, action) => {
      state.media.photos = action.payload;
    },
    setVideos: (state, action) => {
      state.media.videos = action.payload;
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
    setPropertyForm: (state, action) => {
      state.propertyForm = action.payload;
    },
    updatePropertyForm: (state, action) => {
      const formValues  = action.payload;
      Object.keys(formValues).forEach(key => {
        state.propertyForm[key] = formValues[key];
        state.formErrors[key] = null
      });
    },
    setFormError: (state, action) => {
      const errors  = action.payload;
      Object.keys(errors).forEach(key => {
        state.formErrors[key] = errors[key];
      });
    },
    resetForm: (state, action) => {
      state.propertyForm = {};
      state.formErrors = {};
      state.success = null;
      state.createSuccess = null;
      state.updateSuccess = null;
      state.houseRules = [];
      state.media = { photos: [], videos: [] };
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
  addProperty,
  updatePropertyList,
  setPropertyDetails,
  setReviews,
  setHouseRules,
  editHouseRules,
  setPropertyForm,
  updatePropertyForm,
  setFormError,
  resetForm,
  setPhotos,
  setVideos,
  setError,
} = ownerSlice.actions;

export const useSuccess =  () => useSelector(state => state.Owner.success)
export const useCreateSuccess =  () => useSelector(state => state.Owner.createSuccess)
export const useUpdateSuccess =  () => useSelector(state => state.Owner.updateSuccess)
export const useProperty =  () => useSelector(state => state.Owner.property)
export const usePropertyDetails =  () => useSelector(state => state.Owner.propertyDetails)
export const usePropertyForm =  () => useSelector(state => state.Owner.propertyForm)
export const useFormErrors =  () => useSelector(state => state.Owner.formErrors)
export const useReviews =  () => useSelector(state => state.Owner.reviews)
export const useHouseRules =  () => useSelector(state => state.Owner.houseRules)
export const useMedia =  () => useSelector(state => state.Owner.media)
export const useIsLoading =  () => useSelector(state => state.Owner.isLoading)

export default ownerSlice.reducer
