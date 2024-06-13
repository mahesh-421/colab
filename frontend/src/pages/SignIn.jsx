import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Spiner from '../utils/components/Spiner';
import useSignIn from '../hooks/connections/useSignIn';

import logo from '../assets/logo.png';
import background from '../assets/background/app.jpg';

const SignIn = () => {
  const [inFocus, setInFocus] = useState(null);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const clickedButton = useSelector(
    (store) => store.applicationStates.clickedButton
  );
  const navigate = useNavigate();
  const signin = useSignIn();

  const handleLabel = (e, placeholder) => {
    e.target.placeholder =
      e.target.placeholder === placeholder ? '' : placeholder;
    inFocus === placeholder ? setInFocus(null) : setInFocus(placeholder);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await signin(inputs);
  };

  return (
    <div className="h-screen relative">
      <>
        <div className="absolute z-10 m-2 bg-gradient-to-br from-[#984536] to-[#121e92] opacity-90 rounded-md w-16 mx-6">
          <img className="p-3 " src={logo} alt="LOGO" />
        </div>
      </>
      <>
        <div className="absolute h-full w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
          <img className="h-full w-full" src={background} />
        </div>
      </>

      <div className="flex justify-center">
        <form
          onSubmit={handleFormSubmit}
          className="absolute top-52 w-[520px] h-[400px]  bg-black text-black bg-opacity-40 flex flex-col items-center justify-center"
        >
          <>
            {inFocus === 'Username' && (
              <h1 className="w-72 h-5 text-white font-bold">Username</h1>
            )}
            <input
              className="w-72 p-2 mt-5 rounded-md focus:mt-0 focus:outline-none"
              type="text"
              placeholder="Username"
              onFocus={(e) => handleLabel(e, 'Username')}
              onBlur={(e) => handleLabel(e, 'Username')}
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            ></input>
          </>
          <>
            {inFocus === 'Password' && (
              <h1 className="w-72 h-5 text-white font-bold">Password</h1>
            )}
            <input
              className="w-72 p-2 mt-5 rounded-md focus:mt-0 focus:outline-none"
              type="password"
              placeholder="Password"
              onFocus={(e) => handleLabel(e, 'Password')}
              onBlur={(e) => handleLabel(e, 'Password')}
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            ></input>
          </>
          <>
            <p className="text-gray-400 mt-4">
              <span>New to Colab? </span>
              <span
                className="cursor-pointer font-bold hover:text-gray-200"
                onClick={() => navigate('/signup')}
              >
                Sign up now.
              </span>
            </p>
          </>
          <>
            {!clickedButton && (
              <button className="bg-blue-800 w-48 py-2 px-10 my-4 cursor-pointer rounded-md text-white hover:bg-[#121e92]">
                Sign In
              </button>
            )}
            {clickedButton && (
              <button
                className="bg-blue-800 opacity-50 flex justify-center w-48 py-2 px-10 my-4 cursor-not-allowed rounded-md"
                disabled
              >
                <Spiner />
              </button>
            )}
          </>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
