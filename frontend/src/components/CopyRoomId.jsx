import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import copy from '../assets/copy.svg';

const CopyRoomId = () => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  const showRef = useRef();
  const roomId = useParams();
  useEffect(() => {
    const handler = (e) => {
      if (!showRef.current?.contains(e.target)) {
        setShow(false);
      }
    };

    window.addEventListener('mousedown', handler);

    return () => window.removeEventListener('mousedown', handler);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId.roomId);

    setShow(false);
  };

  return (
    <div
      className={`h-screen w-screen absolute overflow-hidden ${
        show ? 'block' : 'hidden'
      }`}
    >
      <div
        className="w-[70%] sm:w-[520px] h-[50%] mt-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform  bg-gray-500 flex flex-col items-center justify-center overflow-hidden z-20"
        ref={showRef}
      >
        <h1 className="w-full max-h-[95px] text-center font-bold text-3xl text-black p-2 mt-14 overflow-hidden">
          Copy and Share Your Room Id
        </h1>
        <div className="flex my-10 w-[90%] ">
          <h1
            //  className="w-[85%] sm:w-72 p-2 mt-5 rounded-md focus:mt-0 focus:outline-none"
            className="text-gray-200 m-2 p-2 w-[90%] sm:w-96  h-10 border-dashed border-2 border-blue-900 overflow-hidden rounded-md "
          >{`${roomId.roomId}`}</h1>

          <div className="relative mb-10">
            <button
              className="  w-10 h-10 m-2 p-2 cursor-pointer  bg-blue-800 hover:hover:bg-[#121e92] hover:opacity-60 rounded-lg relative"
              onClick={handleCopy}
            >
              <img className="abosolute w-8" src={copy} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyRoomId;
