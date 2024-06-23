import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import useCreateVideo from '../../hooks/connections/videoRoom/useCreateVideo';
import useJoinVideo from '../../hooks/connections/videoRoom/useJoinVideo';

import Spiner from '../../utils/components/Spiner';
import { changeActiveConnection } from '../../utils/redux/videoCallSlice';

import background from '../../assets/background/app.jpg';
import back from '../../assets/goBack.svg';

const CreateOrJoinRoomForm = () => {
  const [inFocus, setInFocus] = useState(null);
  const [channelName, setChannelName] = useState('');

  const clickedButton = useSelector((store) => store.applicationStates);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createvideocall = useCreateVideo();
  const joinvideocall = useJoinVideo();

  const handleLabel = (e, placeholder) => {
    e.target.placeholder =
      e.target.placeholder === placeholder ? '' : placeholder;
    inFocus === placeholder ? setInFocus(null) : setInFocus(placeholder);
  };

  const handleJoinRoom = async () => {
    // trim spaces
    const roomId = channelName.trim();

    // validate input: make sure channelName is not empty
    if (roomId === '') {
      toast.error('Room Id can not be empty');
      setChannelName(''); // resets channel name value in case user entered blank spaces
      return;
    }

    await joinvideocall({ roomId });
    dispatch(changeActiveConnection());
    navigate(`/videocallsetup/room/${roomId}`);
  };

  const handleCreateRoom = async () => {
    const roomId = uuidv4();
    await createvideocall({ roomId });
    dispatch(changeActiveConnection());
    navigate(`/videocallsetup/room/${roomId}`);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <div className="absolute h-full w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <img className="h-full w-full" src={background} />
      </div>

      <button
        className=" absolute top-0 left-0  w-10 h-10 m-5 p-2 cursor-pointer flex items-center bg-blue-800 hover:hover:bg-[#121e92]  rounded-lg"
        onClick={() => navigate(`/`)}
      >
        <img className="w-6" src={back} />
      </button>

      <div className="flex justify-center">
        <form
          className="w-[70%] sm:w-[520px] h-[70%] mt-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform  bg-black text-black bg-opacity-40 flex flex-col items-center justify-center"
          onSubmit={(e) => e.preventDefault()} // keep the page from reloading on form submissionhandleConnect
        >
          {inFocus === 'Room ID' && (
            <h1 className="w-[85%] sm:w-72 h-5 text-white font-bold">
              Room ID
            </h1>
          )}
          <input
            className="w-[85%] sm:w-72 p-2 mt-5 rounded-md focus:mt-0 focus:outline-none"
            type="text"
            placeholder="Room ID"
            onFocus={(e) => handleLabel(e, 'Room ID')}
            onBlur={(e) => handleLabel(e, 'Room ID')}
            value={channelName}
            onChange={(e) => {
              setChannelName(e.target.value);
            }}
          />
          <>
            {!clickedButton.joinRoomButton &&
              !clickedButton.createRoomButton && (
                <button
                  className="bg-blue-800 w-[50%] text-sm sm:text-lg h-8 sm:h-10 sm:w-48 py-1.5 px-5 my-4 cursor-pointer rounded-md text-white hover:bg-[#121e92] overflow-hidden"
                  onClick={handleJoinRoom}
                >
                  Join Room
                </button>
              )}
            {clickedButton.joinRoomButton && (
              <button className="bg-blue-800 opacity-50 flex justify-center w-[55%] h-8 sm:h-10 sm:w-48  py-2 px-10 my-4 cursor-not-allowed rounded-md">
                <Spiner />
              </button>
            )}
            {clickedButton.createRoomButton && (
              <button className="bg-blue-800 w-[50%] text-sm sm:text-lg h-8 sm:h-10 sm:w-48 py-1.5 px-5 my-4 cursor-not-allowed rounded-md text-white">
                Join Room
              </button>
            )}
          </>

          <span className="text-gray-400">OR</span>
          <>
            {!clickedButton.createRoomButton &&
              !clickedButton.joinRoomButton && (
                <button
                  className="bg-blue-800 w-[50%] text-sm sm:text-lg h-8 sm:h-10 sm:w-48 py-2 px-5 my-4 cursor-pointer rounded-md text-white hover:bg-[#121e92] overflow-hidden"
                  onClick={handleCreateRoom}
                >
                  Create Room
                </button>
              )}
            {clickedButton.createRoomButton && (
              <button className="bg-blue-800 opacity-50 flex justify-center w-[55%] h-8 sm:h-10 sm:w-48  py-2 px-10 my-4 cursor-not-allowed rounded-md">
                <Spiner />
              </button>
            )}
            {clickedButton.joinRoomButton && (
              <button className="bg-blue-800 w-[50%] text-sm sm:text-lg h-8 sm:h-10 sm:w-48 py-2 px-5 my-4 cursor-not-allowed rounded-md text-white">
                Create Room
              </button>
            )}
          </>
        </form>
      </div>
    </div>
  );
};

export default CreateOrJoinRoomForm;
