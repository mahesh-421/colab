import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  changeFetchAllCodes,
  removeAllCode,
} from '../../utils/redux/compilerSlice';

import { ChakraProvider } from '@chakra-ui/react';

import useGetColabParticipants from '../../hooks/connections/colabRoom/useGetColabParticipants';

import CopyRoomId from '../../components/CopyRoomId';
import Compiler from '../../components/colab/compiler/Compiler';
// import VoiceCall from '../../components/colab/sideBar/VoiceCall';
import SideBar from '../../components/colab/sideBar/SideBar';
// import ChatBox from '../../components/colab/aichat/ChatBox';

import background from '../../assets/background/app.jpg';

import { setup } from '../../components/colab/compiler/constants';

const ColabRoom = () => {
  useGetColabParticipants();
  setup(); // For Saving code Snippet to redux

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(removeAllCode());
    };
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-scroll">
      <div className="absolute h-full w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
        <img className="h-full w-full" src={background} />
      </div>

      <CopyRoomId />
      <ChakraProvider>
        <Compiler />
      </ChakraProvider>
      {/* <VoiceCall /> */}
      <SideBar />
      {/* <ChatBox /> */}
    </div>
  );
};

export default ColabRoom;
