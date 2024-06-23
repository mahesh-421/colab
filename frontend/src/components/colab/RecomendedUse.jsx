import React, { useEffect, useState, useRef } from 'react';

const RecomendedUse = () => {
  const [show, setShow] = useState(true);

  console.log(show);

  return (
    // Suggestion for bad UX to users from Mobile and tablet
    <div
      className={`h-screen w-screen absolute overflow-hidden ${
        show ? 'block' : 'hidden'
      }`}
    >
      <div className="w-[70%] sm:w-[520px] h-[75%] mt-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transform  bg-gray-500 flex flex-col items-center justify-center overflow-hidden rounded-lg  z-10">
        <h1 className="w-full text-center font-bold text-3xl text-black p-2 mt-14 overflow-hidden">
          It is recomended to use this feature in a laptop or a computer on Full
          Screen. If still you want to continue then click on "Continue" button
        </h1>
        <div className="flex my-10 w-[90%] justify-center">
          <div className="relative mb-10">
            <button
              className="  h-10 m-2 p-2 cursor-pointer  bg-blue-800 hover:hover:bg-[#121e92] hover:opacity-60 rounded-lg relative"
              onClick={() => setShow(false)}
            >
              <span className="">Continue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    //
  );
};

export default RecomendedUse;
