import { createSlice } from '@reduxjs/toolkit';

const videoCallSlice = createSlice({
  name: 'videoCallSlice',
  initialState: {
    showSideBarOrChatBox: false,
    mic: true,
    activeConnection: false,
    submit: false,
    // messages: [],
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
    changeActiveConnection: (state) => {
      state.activeConnection = !state.activeConnection;
    },
    changeSubmit: (state) => {
      state.submit = !state.submit;
    },
    addParticipant: (state, action) => {
      state.participants.push(action.payload);
    },
    addAllParticipants: (state, action) => {
      state.participants = action.payload;
    },
    // addMessage: (state, action) => {
    //   state.messages.push(action.payload);
    // },
    // removeMessages: (state) => {
    //   state.messages = null;
    // },
  },
});

export const {
  changeShowSideBar,
  changeShowChatBox,
  changeMic,
  changeActiveConnection,
  changeSubmit,
  addAllParticipants,
  addParticipant,
  // addMessage,
  // removeMessages,
} = videoCallSlice.actions;
export default videoCallSlice.reducer;
