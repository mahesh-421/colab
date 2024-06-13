import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useLeaveColab from '../../hooks/connections/colabRoom/useLeaveColab';

// import { removeMessages } from '../../utils/redux/colabSlice';

import mute from '../../assets/videoCall/mute.svg';
import unMute from '../../assets/videoCall/unMute.svg';
import hungUp from '../../assets/videoCall/hungUp.svg';

import peoples from '../../assets/videoCall/peoples.svg';

import ai from '../../assets/colab/ai.svg';

import {
  changeMic,
  changeShowChatBox,
  changeShowSideBar,
  changeActiveConnection,
} from '../../utils/redux/colabSlice';

const ColabControlers = () => {
  const colabData = useSelector((store) => store.colabStates);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const leavecolab = useLeaveColab();

  const handleLeaveRoom = async () => {
    await leavecolab({ roomId });
    dispatch(changeActiveConnection());
    // dispatch(removeMessages());
  };

  return (
    <div className="relative h-full w-full justify-center flex items-end pb-10 ">
      <div className="absolute top-0 right-0 z-10 pt-2 pr-7 flex">
        {!colabData.showSideBarOrChatBox && (
          <button
            className=" w-10 h-10  p-2 cursor-pointer flex items-center bg-blue-800  opacity-80 hover:opacity-100 rounded-lg"
            onClick={() => dispatch(changeShowSideBar())}
          >
            <img className="w-6" src={peoples} />
          </button>
        )}
        {/* {!colabData.showSideBarOrChatBox && (
          <button
            className=" w-10 h-10 m-1 p-2 cursor-pointer flex items-center bg-blue-800 opacity-35 hover:opacity-80 rounded-lg"
            onClick={() => dispatch(changeShowChatBox())}
          >
            <img className="w-6" src={ai} />
          </button>
        )} */}
      </div>
      {!colabData.showSideBarOrChatBox && (
        <div className="absolute flex z-10 right-0 mr-10">
          {!colabData.mic && (
            <button
              className=" w-10 h-10 mx-3 mb-5 p-2 cursor-pointer flex items-center bg-blue-950 bg-opacity-20 hover:bg-opacity-100 rounded-full"
              onClick={() => dispatch(changeMic())}
            >
              <img className="w-6" src={unMute} />
            </button>
          )}
          {colabData.mic && (
            <button
              className=" w-10 h-10 mx-3 mb-5 p-2 cursor-pointer flex items-center bg-gray-800 bg-opacity-20 hover:bg-opacity-50 rounded-full"
              onClick={() => dispatch(changeMic())}
            >
              <img className="w-6" src={mute} />
            </button>
          )}

          {
            <button
              className=" w-10 h-10 mx-3 mb-5 p-2 cursor-pointer flex items-center bg-red-900 bg-opacity-10 hover:bg-opacity-100 rounded-full"
              onClick={handleLeaveRoom}
            >
              <img className="w-6" src={hungUp} />
            </button>
          }
        </div>
      )}
    </div>
  );
};

export default ColabControlers;
