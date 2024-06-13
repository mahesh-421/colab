import { createSlice } from '@reduxjs/toolkit';

const compilerSlice = createSlice({
  name: 'compilerSlice',
  initialState: {
    codes: [],
    broadcastCodes: false,
    fetchAllCodes: false,
  },
  reducers: {
    addCode: (state, action) => {
      state.codes.push(action.payload);
    },
    addAllCodes: (state, action) => {
      state.codes = action.payload;
    },
    removeAllCode: (state) => {
      state.codes = [];
    },
    changeBroadcastCodes: (state) => {
      state.broadcastCodes = !state.broadcastCodes;
    },
    changeFetchAllCodes: (state) => {
      state.fetchAllCodes = !state.fetchAllCodes;
    },
  },
});

export const {
  addCode,
  addAllCodes,
  removeAllCode,
  changeBroadcastCodes,
  changeFetchAllCodes,
} = compilerSlice.actions;
export default compilerSlice.reducer;
