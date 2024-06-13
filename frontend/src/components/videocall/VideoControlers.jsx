import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useLeaveVideo from '../../hooks/connections/videoRoom/useLeaveVideo';

import cameraOff from '../../assets/videoCall/cameraOff.svg';
import cameraOn from '../../assets/videoCall/cameraOn.svg';
import mute from '../../assets/videoCall/mute.svg';
import unMute from '../../assets/videoCall/unMute.svg';
import hungUp from '../../assets/videoCall/hungUp.svg';

import peoples from '../../assets/videoCall/peoples.svg';
import chat from '../../assets/videoCall/chat.svg';

import {
  changeMic,
  changeCamera,
  changeShowChatBox,
  changeShowSideBar,
  changeActiveConnection,
  removeMessages,
} from '../../utils/redux/videoCallSlice';

const VideoControlers = () => {
  const videoCallData = useSelector((store) => store.videoCallStates);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const leavevideocall = useLeaveVideo();

  const handleLeaveRoom = async () => {
    await leavevideocall({ roomId });
    dispatch(changeActiveConnection());
    dispatch(removeMessages());
    navigate(`/`);
  };

  return (
    <div className="relative h-full w-full justify-center flex items-end pb-16 ">
      <div className="absolute top-0 right-0 z-20 pt-10 pr-10 flex">
        {!videoCallData.showSideBarOrChatBox && (
          <button
            className=" w-10 h-10 m-1 mr-5 p-2 cursor-pointer flex items-center bg-blue-800 opacity-80 hover:opacity-100 rounded-lg"
            onClick={() => dispatch(changeShowSideBar())}
          >
            <img className="w-6" src={peoples} />
          </button>
        )}
        {!videoCallData.showSideBarOrChatBox && (
          <button
            className=" w-10 h-10 m-1 p-2 cursor-pointer flex items-center bg-blue-800 bg-opacity-80 hover:opacity-100  rounded-lg"
            onClick={() => dispatch(changeShowChatBox())}
          >
            <img className="w-6" src={chat} />
          </button>
        )}
      </div>
      <div className="absolute flex z-10">
        {!videoCallData.mic && (
          <button
            className=" w-10 h-10 mx-3 mb-5 p-2 cursor-pointer flex items-center bg-blue-950 bg-opacity-70 hover:bg-opacity-100 rounded-full"
            onClick={() => dispatch(changeMic())}
          >
            <img className="w-6" src={unMute} />
          </button>
        )}
        {videoCallData.mic && (
          <button
            className=" w-10 h-10 mx-3 mb-5 p-2 cursor-pointer flex items-center bg-gray-800 bg-opacity-20 hover:bg-opacity-50 rounded-full"
            onClick={() => dispatch(changeMic())}
          >
            <img className="w-6" src={mute} />
          </button>
        )}
        {!videoCallData.camera && (
          <button
            className=" w-10 h-10 mx-3 mb-5 p-2 cursor-pointer flex items-center bg-blue-950 bg-opacity-70 hover:bg-opacity-100 rounded-full"
            onClick={() => dispatch(changeCamera())}
          >
            <img className="w-6" src={cameraOff} />
          </button>
        )}
        {videoCallData.camera && (
          <button
            className=" w-10 h-10 mx-3 mb-5 p-2 cursor-pointer flex items-center bg-gray-800 bg-opacity-20 hover:bg-opacity-50 rounded-full"
            onClick={() => dispatch(changeCamera())}
          >
            <img className="w-6" src={cameraOn} />
          </button>
        )}
        {
          <button
            className=" w-10 h-10 mx-3 mb-5 p-2 cursor-pointer flex items-center bg-red-900 bg-opacity-60 hover:bg-opacity-100 rounded-full"
            onClick={handleLeaveRoom}
          >
            <img className="w-6" src={hungUp} />
          </button>
        }
      </div>
    </div>
  );
};

export default VideoControlers;
