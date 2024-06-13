import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';

// import AgoraRTC, { AgoraRTCProvider, useRTCClient } from 'agora-rtc-react';

import CreateOrJoinRoomForm from './CreateOrJoinRoomForm';

const VideoCallSetup = () => {
  // const agoraClient = useRTCClient(
  //   AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' })
  // ); // Initialize Agora Client

  return (
    <div>
      <Routes>
        <Route path="/" element={<CreateOrJoinRoomForm />}></Route>
      </Routes>
      {/* <AgoraRTCProvider client={agoraClient}> */}

      <Outlet />
      {/* </AgoraRTCProvider> */}
    </div>
  );
};

export default VideoCallSetup;
