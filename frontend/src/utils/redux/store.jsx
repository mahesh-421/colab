import { configureStore } from '@reduxjs/toolkit';

import userInfo from './userInfo';
import applicationStates from './applicationStates';
import videoCallStates from './videoCallSlice';
import colabStates from './colabSlice';
import compilerdata from './compilerSlice';

const store = configureStore({
  reducer: {
    applicationStates: applicationStates,
    userInfo: userInfo,
    videoCallStates: videoCallStates,
    colabStates: colabStates,
    compilerdata: compilerdata,
  },
});

export default store;
