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
    let handler = (e) => {
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
    <div className="absolute w-screen h-screen ">
      {show && (
        <div
          className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-500 w-[50%] h-[40%] overflow-clip rounded-lg z-30 "
          ref={showRef}
        >
          <h1 className="w-full text-center font-bold text-3xl text-black p-2 mt-14">
            Copy and Share Your Room Id
          </h1>
          <div className="flex my-10">
            <h1 className="text-gray-200 m-2 p-2 w-[90%] h-10 border-dashed border-2 border-blue-900 overflow-hidden rounded-md ">{`${roomId.roomId}`}</h1>

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
      )}
    </div>
  );
};

export default CopyRoomId;
