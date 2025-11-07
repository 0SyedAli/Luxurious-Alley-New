import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    activeVendorId: null,
    activeChat: null,
    conversations: [],
    messages: [],
    loading: false,
    currentUser: null,
    shouldOpenChat: false
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setActiveVendorId: (state, action) => {
      state.activeVendorId = action.payload;
      state.shouldOpenChat = true;
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
      state.shouldOpenChat = false;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearActiveVendor: (state) => {
      state.activeVendorId = null;
      state.shouldOpenChat = false;
    },
    resetChatState: (state) => {
      state.activeVendorId = null;
      state.activeChat = null;
      state.shouldOpenChat = false;
    }
  }
});

export const {
  setCurrentUser,
  setActiveVendorId,
  setActiveChat,
  setConversations,
  setMessages,
  addMessage,
  setLoading,
  clearActiveVendor,
  resetChatState
} = chatSlice.actions;

export default chatSlice.reducer;