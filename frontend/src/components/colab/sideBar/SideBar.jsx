import React, { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useLeaveColab from '../../../hooks/connections/colabRoom/useLeaveColab';

import {
  changeMic,
  changeShowSideBar,
  changeActiveConnection,
  // removeMessages,
} from '../../../utils/redux/colabSlice';

import mute from '../../../assets/videoCall/mute.svg';
import unMute from '../../../assets/videoCall/unMute.svg';
import hungUp from '../../../assets/videoCall/hungUp.svg';
import peoples from '../../../assets/videoCall/peoples.svg';

const SideBar = () => {
  const colabData = useSelector((store) => store.colabStates);
  const userInfo = useSelector((store) => store.userInfo);
  const _id = userInfo.userData?._id;

  const showSideBarRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const leavecolab = useLeaveColab();

  const handleLeaveRoom = async () => {
    await leavecolab({ roomId });
    dispatch(changeActiveConnection());
    // dispatch(removeMessages());
    navigate(`/`);
  };

  useEffect(() => {
    const handler = (e) => {
      if (
        !showSideBarRef.current?.contains(e.target) &&
        colabData.showSideBarOrChatBox === 'showSideBar'
      )
        dispatch(changeShowSideBar());
    };

    window.addEventListener('mousedown', handler);

    return () => window.removeEventListener('mousedown', handler);
  }, [colabData.showSideBarOrChatBox]);

  return (
    <div className="flex items-center">
      {colabData.showSideBarOrChatBox === 'showSideBar' && (
        <div
          className="relative w-72 h-[97%] my-5 mx-1 rounded-b-lg bg-black text-black bg-opacity-40 "
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
            {/* <button
              className="absolute  left-0 w-10 h-10 m-1 p-2 cursor-pointer flex items-center "
              onClick={() => dispatch(changeShowChatBox())}
            >
              <img className="w-6" src={ai} />
            </button> */}
          </div>

          <div className="w-full h-[90%] overflow-y-scroll flex flex-col text-gray-400 ">
            {colabData.participants?.map((participant) => {
              return (
                <>
                  {participant._id !== _id && (
                    <h1
                      className=" px-5 py-4 border-b-2 border-gray-600"
                      key={participant._id}
                    >
                      {participant.fullName}
                    </h1>
                  )}
                  {participant._id === _id && (
                    <div
                      className="flex justify-between border-b-2 border-gray-600"
                      key={participant._id}
                    >
                      <h1 className=" pl-5 py-4 ">{participant.fullName}</h1>
                      <div className="flex items-center justify-center">
                        {!colabData.mic && (
                          <button
                            className=" w-10 h-10 mx-3  p-2 cursor-pointer flex items-center bg-blue-950 bg-opacity-70 hover:bg-opacity-100 rounded-full"
                            onClick={() => dispatch(changeMic())}
                          >
                            <img className="w-6" src={unMute} />
                          </button>
                        )}
                        {colabData.mic && (
                          <button
                            className=" w-10 h-10 mx-3 p-2 cursor-pointer flex items-center bg-gray-800 bg-opacity-40 hover:bg-opacity-70 rounded-full"
                            onClick={() => dispatch(changeMic())}
                          >
                            <img className="w-6" src={mute} />
                          </button>
                        )}
                        {
                          <button
                            className=" w-10 h-10 mx-3  p-2 cursor-pointer flex items-center bg-red-900 bg-opacity-40 hover:bg-opacity-100 rounded-full"
                            onClick={handleLeaveRoom}
                          >
                            <img className="w-6" src={hungUp} />
                          </button>
                        }
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
