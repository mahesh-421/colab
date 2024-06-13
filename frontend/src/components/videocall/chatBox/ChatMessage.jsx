import React from 'react';

const ChatMessage = ({ name, message }) => {
  return (
    <div className="m-2 p-2 bg-gray-500 rounded-lg ">
      <h1 className="font-bold text-xl text-white">{name}</h1>
      <span className="text-md text-white break-words">{message}</span>
    </div>
  );
};

export default ChatMessage;
