import { createSlice } from '@reduxjs/toolkit';

const applicationStateSlice = createSlice({
  name: 'applicationslice',
  initialState: {
    authUser: false,
    clickedButton: false,
    joinRoomButton: false,
    createRoomButton: false,
    showVideoPage: false,
    showColabPage: false,
  },
  reducers: {
    changeAuthUser: (state) => {
      state.authUser = !state.authUser;
    },
    changeClickedButton: (state) => {
      state.clickedButton = !state.clickedButton;
    },
    changeCreateRoom: (state) => {
      state.createRoomButton = !state.createRoomButton;
    },
    changeJoinRoom: (state) => {
      state.joinRoomButton = !state.joinRoomButton;
    },
    changeShowVideoPage: (state) => {
      state.showVideoPage = !state.showVideoPage;
    },
    changeShowColabPage: (state) => {
      state.showColabPage = !state.showColabPage;
    },
  },
});

export const {
  changeAuthUser,
  changeClickedButton,
  changeJoinRoom,
  changeCreateRoom,
  changeShowVideoPage,
  changeShowColabPage,
} = applicationStateSlice.actions;
export default applicationStateSlice.reducer;
