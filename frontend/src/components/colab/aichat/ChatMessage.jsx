import React from 'react';

const ChatMessage = ({ name, message }) => {
  const aiMessage = message.split('**');

  return (
    <div className="m-2 p-2 bg-gray-500 rounded-lg ">
      <h1 className="font-bold text-xl text-white">{name}</h1>
      {aiMessage?.map((ans, index) => (
        <span className="text-md text-white break-words" key={index}>
          {ans}
        </span>
      ))}
    </div>
  );
};

export default ChatMessage;
