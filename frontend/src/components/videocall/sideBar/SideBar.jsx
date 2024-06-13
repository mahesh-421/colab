import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  changeShowSideBar,
  changeShowChatBox,
} from '../../../utils/redux/videoCallSlice';

import peoples from '../../../assets/videoCall/peoples.svg';
import chat from '../../../assets/videoCall/chat.svg';

const SideBar = () => {
  const videoCallData = useSelector((store) => store.videoCallStates);

  const showSideBarRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = (e) => {
      if (
        !showSideBarRef.current?.contains(e.target) &&
        videoCallData.showSideBarOrChatBox === 'showSideBar'
      )
        dispatch(changeShowSideBar());
    };

    window.addEventListener('mousedown', handler);

    return () => window.removeEventListener('mousedown', handler);
  }, [videoCallData.showSideBarOrChatBox]);

  return (
    <div className="flex items-center">
      {videoCallData.showSideBarOrChatBox === 'showSideBar' && (
        <div
          className="relative w-72 h-[95%] mx-1 rounded-b-lg bg-black text-black bg-opacity-40 z-10"
          ref={showSideBarRef}
        >
          <div className="relative flex bg-blue-800 bg-opacity-80 rounded-t-lg">
            <button
              className="absolute right-0 z-10 w-10 h-10 m-1 p-2 cursor-pointer flex items-center "
              onClick={() => dispatch(changeShowSideBar())}
            >
              <img className="w-6" src={peoples} />
            </button>
            <h1 className="font-bold h-12 w-full flex items-center justify-center text-white ">
              Participants
            </h1>
            <button
              className="absolute  left-0 w-10 h-10 m-1 p-2 cursor-pointer flex items-center "
              onClick={() => dispatch(changeShowChatBox())}
            >
              <img className="w-6" src={chat} />
            </button>
          </div>

          <div className="w-full h-[90%] overflow-y-scroll flex flex-col text-gray-400 ">
            {videoCallData.participants?.map((participant) => (
              <h1
                className=" px-5 py-4 border-b-2 border-gray-600"
                key={participant._id}
              >
                {participant.fullName}
              </h1>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
