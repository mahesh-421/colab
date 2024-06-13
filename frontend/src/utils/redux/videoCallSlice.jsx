import { createSlice } from '@reduxjs/toolkit';

const videoCallSlice = createSlice({
  name: 'videoCallSlice',
  initialState: {
    showSideBarOrChatBox: false,
    mic: true,
    camera: true,
    activeConnection: false,
    messages: [],
    participants: [],
  },
  reducers: {
    changeShowSideBar: (state) => {
      if (
        !state.showSideBarOrChatBox ||
        state.showSideBarOrChatBox === 'showChatBox'
      )
        state.showSideBarOrChatBox = 'showSideBar';
      else if (state.showSideBarOrChatBox === 'showSideBar')
        state.showSideBarOrChatBox = false;
    },
    changeShowChatBox: (state) => {
      if (
        !state.showSideBarOrChatBox ||
        state.showSideBarOrChatBox === 'showSideBar'
      )
        state.showSideBarOrChatBox = 'showChatBox';
      else if (state.showSideBarOrChatBox === 'showChatBox')
        state.showSideBarOrChatBox = false;
    },
    changeMic: (state) => {
      state.mic = !state.mic;
    },
    changeCamera: (state) => {
      state.camera = !state.camera;
    },
    changeActiveConnection: (state) => {
      state.activeConnection = !state.activeConnection;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessages: (state) => {
      state.messages = null;
    },
    addAllMessages: (state, action) => {
      state.messages = action.payload;
    },
    addParticipant: (state, action) => {
      state.participants.push(action.payload);
    },
    addAllParticipants: (state, action) => {
      state.participants = action.payload;
    },
  },
});

export const {
  changeShowSideBar,
  changeShowChatBox,
  changeMic,
  changeCamera,
  changeActiveConnection,
  addAllMessages,
  addMessage,
  removeMessages,
  addAllParticipants,
  addParticipant,
} = videoCallSlice.actions;
export default videoCallSlice.reducer;
