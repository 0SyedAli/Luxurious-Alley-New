// import { createSlice } from '@reduxjs/toolkit';

// const chatSlice = createSlice({
//   name: 'chat',
//   initialState: {
//     activeVendorId: null,
//     activeVendorData: null,
//     activeChat: null,
//     conversations: [],
//     messages: [],
//     loading: false,
//     currentUser: null,
//     shouldOpenChat: false
//   },
//   reducers: {
//     setCurrentUser: (state, action) => {
//       state.currentUser = action.payload;
//     },
//     setActiveVendorId: (state, action) => {
//       state.activeVendorId = action.payload;
//       state.shouldOpenChat = true;
//     },
//     setActiveVendorData: (state, action) => { // ADD THIS
//       state.activeVendorData = action.payload;
//     },
//     setActiveChat: (state, action) => {
//       state.activeChat = action.payload;
//       state.shouldOpenChat = false;
//     },
//     setConversations: (state, action) => {
//       state.conversations = action.payload;
//     },
//     setMessages: (state, action) => {
//       state.messages = action.payload;
//     },
//     addMessage: (state, action) => {
//       state.messages.push(action.payload);
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     clearActiveVendor: (state) => {
//       state.activeVendorId = null;
//       state.shouldOpenChat = false;
//     },
//     resetChatState: (state) => {
//       state.activeVendorId = null;
//       state.activeVendorData = null;
//       state.activeChat = null;
//       state.shouldOpenChat = false;
//     }
//   }
// });

// export const {
//   setCurrentUser,
//   setActiveVendorId,
//   setActiveVendorData,
//   setActiveChat,
//   setConversations,
//   setMessages,
//   addMessage,
//   setLoading,
//   clearActiveVendor,
//   resetChatState
// } = chatSlice.actions;

// export default chatSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    activeVendorId: null,
    activeVendorData: null, // NEW: Store complete vendor data
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
    setActiveVendorData: (state, action) => { // NEW: Set vendor data
      state.activeVendorData = action.payload;
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
      state.activeVendorData = null; // Clear vendor data too
      state.shouldOpenChat = false;
    },
    resetChatState: (state) => {
      state.activeVendorId = null;
      state.activeVendorData = null;
      state.activeChat = null;
      state.shouldOpenChat = false;
      state.messages = [];
    }
  }
});

export const {
  setCurrentUser,
  setActiveVendorId,
  setActiveVendorData, // NEW export
  setActiveChat,
  setConversations,
  setMessages,
  addMessage,
  setLoading,
  clearActiveVendor,
  resetChatState
} = chatSlice.actions;

export default chatSlice.reducer;