import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  changeShowSideBar,
  changeShowChatBox,
  // addMessage,
} from '../../../utils/redux/colabSlice';

import useAiChat from '../../../hooks/connections/colabRoom/useAiChat';

import ChatMessage from './ChatMessage';

import chat from '../../../assets/videoCall/chat.svg';
import send from '../../../assets/videoCall/send.svg';
import peoples from '../../../assets/videoCall/peoples.svg';

const ChatBox = () => {
  const [message, setMessage] = useState('');

  const lastMessageRef = useRef();

  const aichat = useAiChat();

  const dispatch = useDispatch();

  const colabData = useSelector((store) => store.colabStates);
  const userInfo = useSelector((store) => store.userInfo);
  const fullName = userInfo.userData?.fullName;

  const handleSendMessage = async () => {
    if (!message) return;

    //storing message to redux
    const obj = {
      fullName,
      message,
    };
    // dispatch(addMessage(obj));

    //calling gemini for message
    await aichat(message);
    setMessage('');
  };

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [colabData.messages]);

  return (
    <div className="flex h-[95%] my-5 mx-1">
      {colabData.showSideBarOrChatBox === 'showChatBox' && (
        <div className="relative w-[25rem] h-full rounded-b-lg bg-black text-black bg-opacity-40">
          <div className="relative flex bg-blue-800 bg-opacity-80 rounded-t-lg">
            <button
              className="absolute left-0 z-10 w-10 h-10 m-1 p-2 cursor-pointer flex items-center "
              onClick={() => dispatch(changeShowSideBar())}
            >
              <img className="w-6" src={peoples} />
            </button>
            <h1 className="font-bold h-12 w-full flex items-center justify-center text-white ">
              AI Support
            </h1>
            <button
              className="absolute right-0 w-10 h-10 m-1 p-2 cursor-pointer flex items-center "
              onClick={() => dispatch(changeShowChatBox())}
            >
              <img className="w-6" src={chat} />
            </button>
          </div>
          <div className="w-full h-[85%] p-2">
            <div className=" flex flex-col text-gray-400 h-full w-full overflow-y-scroll border border-gray-500 rounded-lg">
              {colabData.messages?.map((chat, index) => (
                <div ref={lastMessageRef} key={index}>
                  <ChatMessage message={chat.message} name={chat.fullName} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex">
            <textarea
              className="resize-none focus:outline-none mr-2 ml-3 p-3 h-12 w-[80%] rounded-lg"
              name="Message"
              maxLength={140}
              placeholder="Message limit 140 characters"
              onFocus={(e) => (e.target.placeholder = '')}
              onBlur={(e) => (e.target.placeholder = 'Message')}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              className="right-0 bottom w-10 h-10 m-1 p-2 cursor-pointer flex items-center bg-blue-800 bg-opacity-80 hover:bg-opacity-100 rounded-lg"
              onClick={handleSendMessage}
            >
              <img className="w-6" src={send} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
