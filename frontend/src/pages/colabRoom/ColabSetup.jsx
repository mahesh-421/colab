import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';

import CreateOrJoinRoomForm from './CreateOrJoinRoomForm';

const VideoCallSetup = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CreateOrJoinRoomForm />}></Route>
      </Routes>
      <Outlet />
    </div>
  );
};

export default VideoCallSetup;
