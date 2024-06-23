import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useLogout from '../hooks/connections/useLogout';

import Spiner from '../utils/components/Spiner';

import videoCall from '../assets/homepage/videoCall.svg';
import compiler from '../assets/homepage/compiler.png';
// import gpt from '../assets/homepage/gpt.png';
// import audio from '../assets/homepage/audio.png';
import background from '../assets/background/app.jpg';
import logo from '../assets/logo.png';

const Homepage = () => {
  const userInfo = useSelector((store) => store.userInfo);
  const profilePic = userInfo.userData?.profilePic;
  const clickedButton = useSelector(
    (store) => store.applicationStates.clickedButton
  );

  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <div className=" h-screen w-screen flex items-center justify-center overflow-hidden">
      <div className="m-5 md:w-16 w-12 absolute top-0 left-0 z-10 bg-gradient-to-br from-[#984536] to-[#121e92] opacity-90 rounded-md ">
        <img className="p-3 " src={logo} alt="LOGO" />
      </div>
      <div className="absolute z-10 right-0 top-0 transform -translate-y-0 translate-x-0 flex ">
        <div className=" m-5 md:w-16 w-12">
          <img className="w-full rounded-full" src={profilePic} />
        </div>

        {!clickedButton && (
          <button
            className=" py-2 md:w-44 w-30 px-6 my-6 md:ml-4 mr-4 md:mr-10 bg-blue-800 cursor-pointer rounded-md text-white hover:bg-[#121e92]"
            onClick={logout}
          >
            Logout
          </button>
        )}
        {clickedButton && (
          <button
            className="py-2 md:w-44 w-30 px-6 my-6 md:ml-4 mr-4 md:mr-10 bg-blue-800  opacity-50 flex justify-center cursor-not-allowed rounded-md"
            disabled
          >
            <Spiner />
          </button>
        )}
      </div>

      <div className="absolute h-full w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <img className="h-full w-full" src={background} />
      </div>

      <div className=" w-full flex justify-center overflow-x-scroll no-scrollbar z-10 snap-x snap-mandatory">
        <div className=" md:size-52 m-5 ml-64 xs:ml-24 md:m-10 flex flex-shrink-0 items-center justify-center snap-center">
          {!clickedButton && (
            <button
              className=" size-32 md:size-52  bg-gray-300 relative hover:border-2 rounded-3xl hover:border-gray-500 hover:animate-pulse cursor-pointer flex justify-center items-center"
              onClick={() => navigate('/videocallsetup')}
            >
              <img
                className="size-20 md:size-40"
                src={videoCall}
                alt="Video Call"
              />
            </button>
          )}
          {clickedButton && (
            <button className="size-32 md:size-52 m-5 md:m-10 bg-gray-300 relative rounded-3xl cursor-not-allowed flex justify-center items-center">
              <img
                className="size-20 md:size-40 "
                src={videoCall}
                alt="Video Call"
              />
            </button>
          )}
        </div>
        <div className=" md:size-52 m-5 mr-24 md:m-10 flex flex-shrink-0 items-center justify-center snap-center">
          {!clickedButton && (
            <button
              className=" size-32 md:size-52  bg-gray-300 relative hover:border-2 rounded-3xl hover:border-gray-500 hover:animate-pulse cursor-pointer flex justify-center items-center"
              onClick={() => navigate('/colabsetup')}
            >
              <img
                className="size-20 md:size-40 "
                src={compiler}
                alt="Compiler"
              />
            </button>
          )}
          {clickedButton && (
            <button className="size-32 md:size-52 m-5  md:m-10 bg-gray-300 relative rounded-3xl cursor-not-allowed flex justify-center items-center">
              <img
                className="size-20 md:size-40"
                src={compiler}
                alt="Compiler"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
