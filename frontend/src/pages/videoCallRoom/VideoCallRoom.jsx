import React from 'react';

import useGetVideoParticipants from '../../hooks/connections/videoRoom/useGetVideoParticipants';
import useGetMessage from '../../hooks/connections/videoRoom/useGetMessage';

import CopyRoomId from '../../components/CopyRoomId';
import VideoContainer from '../../components/videocall/videoContainer/VideoContainer';
import SideBar from '../../components/videocall/sideBar/SideBar';
import ChatBox from '../../components/videocall/chatBox/ChatBox';

import background from '../../assets/background/app.jpg';

const VideoCallRoom = () => {
  useGetVideoParticipants();
  useGetMessage();

  return (
    <div className="flex h-screen w-screen justify-center">
      <div className="absolute h-full w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <img className="h-full w-full" src={background} />
      </div>

      <CopyRoomId />

      <VideoContainer />

      <SideBar />
      <ChatBox />
    </div>
  );
};

export default VideoCallRoom;
