import { createSlice } from '@reduxjs/toolkit';

const userDataSlice = createSlice({
  name: 'userDataSlice',
  initialState: { userData: null },
  reducers: {
    addUserData: (state, action) => {
      state.userData = action.payload;
    },
    removeUserData: (state) => {
      state.userData = null;
    },
  },
});

export const { addUserData, removeUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
