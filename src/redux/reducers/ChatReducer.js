// Reducer that changes the state based on the action

import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { getChannelName } from '../../services/PubNubChat';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    isLoading: false,
    error: null,
    chats: [],
    channelList: {},
    chatDetails: {},
    success: null,
    channellistUpdated: false
  },
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true;
      state.success = false
      state.error = null;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
      state.success = true;
      state.error = null;
      state.isLoading = false
    },
    setChannelList: (state, action) => {
      state.channelList = action.payload;
      state.success = true;
      state.error = null;
      state.isLoading = false;
      state.channellistUpdated = false;
    },
    updateChannelList: (state, action) => {
      const newChannel = action.payload; 
      const findChannel = state.channelList.results?.find(
        (i) => i.channel_name === newChannel.channel_name,
      );
      if (!findChannel)
        state.channelList.results = [...state.channelList.results, newChannel ];
      state.success = true;
      state.error = null;
      state.isLoading = false;
      state.channellistUpdated = true;
    },
    setChannelListUpdated: (state, action) => {
      state.channellistUpdated = action.payload;
    },
    setChatDetails: (state, action) => {
      state.chatDetails = action.payload;
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
  setChats,
  setChannelList,
  setChannelListUpdated,
  setChatDetails,
  updateChannelList,
  setError
} = chatSlice.actions;

export const useSuccess =  () => useSelector(state => state.Chat.success)
export const useChats =  () => useSelector(state => state.Chat.chats)
export const useChannelList =  () => useSelector(state => state.Chat.channelList)
export const useChannelListUpdated =  () => useSelector(state => state.Chat.channellistUpdated)
export const useChatDetails =  () => useSelector(state => state.Chat.chatDetails)
export const useIsLoading =  () => useSelector(state => state.Chat.isLoading)

export default chatSlice.reducer
