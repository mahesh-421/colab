import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useLogout from '../hooks/connections/useLogout';

import Spiner from '../utils/components/Spiner';

import videoCall from '../assets/homepage/videoCall.svg';
import compiler from '../assets/homepage/compiler.png';
import gpt from '../assets/homepage/gpt.png';
import audio from '../assets/homepage/audio.png';
import background from '../assets/background/app.jpg';

const Homepage = () => {
  const userInfo = useSelector((store) => store.userInfo);
  const profilePic = userInfo.userData?.profilePic;
  const clickedButton = useSelector(
    (store) => store.applicationStates.clickedButton
  );

  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <div className=" relative h-screen w-screen">
      <div className="absolute z-10 right-0 top-0 transform -translate-y-0 translate-x-0 flex ">
        <div className=" ">
          <img className="w-14 my-4 rounded-full" src={profilePic} />
        </div>
        <>
          {!clickedButton && (
            <button
              className=" bg-blue-800 py-2 w-28 px-6 my-6 ml-4 mr-10 cursor-pointer rounded-md text-white hover:bg-[#121e92]"
              onClick={logout}
            >
              Logout
            </button>
          )}
          {clickedButton && (
            <button
              className="bg-blue-800 py-2 w-28 px-6 my-6 ml-4 mr-10 opacity-50 flex justify-center cursor-not-allowed rounded-md"
              disabled
            >
              <Spiner />
            </button>
          )}
        </>
      </div>
      <>
        <div className="absolute h-full w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <img className="h-full w-full" src={background} />
        </div>
      </>

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex">
        <>
          {!clickedButton && (
            <button
              className="w-52 h-52 mx-10 bg-gray-300 relative  hover:border-2 rounded-3xl hover:border-gray-500 hover:animate-pulse cursor-pointer"
              onClick={() => navigate('/videocallsetup')}
            >
              <img
                className="w-36 absolute top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2"
                src={videoCall}
                alt="Video Call"
              />
            </button>
          )}
          {clickedButton && (
            <button className="w-52 h-52 mx-10 bg-gray-300 relative rounded-3xl cursor-not-allowed">
              <img
                className="w-36 absolute top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2"
                src={videoCall}
                alt="Video Call"
              />
            </button>
          )}
        </>
        <>
          {!clickedButton && (
            <button
              className="w-52 h-52 mx-10 bg-gray-300 relative  hover:border-2 rounded-3xl hover:border-gray-500 hover:animate-pulse cursor-pointer"
              onClick={() => navigate('/colabsetup')}
            >
              <img
                className="w-36 absolute top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2"
                src={compiler}
                alt="Compiler"
              />
            </button>
          )}
          {clickedButton && (
            <button className="w-52 h-52 mx-10 bg-gray-300 relative rounded-3xl cursor-not-allowed">
              <img
                className="w-36 absolute top-1/2 left-1/2 tranform -translate-x-1/2 -translate-y-1/2"
                src={compiler}
                alt="Compiler"
              />
            </button>
          )}
        </>
      </div>
    </div>
  );
};

export default Homepage;
