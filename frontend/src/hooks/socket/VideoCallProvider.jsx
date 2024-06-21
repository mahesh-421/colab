import { useState, useEffect, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

import toast from 'react-hot-toast';

import {
  addParticipant,
  addAllParticipants,
  addMessage,
} from '../../utils/redux/videoCallSlice';

// const SocketContext = createContext();

// export const VideoCallProvider = ({ children }) => {
const VideoCallProvider = () => {
  const [socket, setSocket] = useState(null);

  const applicationStates = useSelector((store) => store.applicationStates);

  const userData = useSelector((store) => store.userInfo.userData);
  const _id = userData?._id;

  const { roomId } = useParams();
  const dispatch = useDispatch();

  const roomName = roomId;

  useEffect(() => {
    if (applicationStates.showVideoPage && applicationStates.authUser) {
      // const socket = io('/mediasoup');

      //

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [applicationStates.showVideoPage]);

  // return <SocketContext.Provider>{children}</SocketContext.Provider>;
};

export default VideoCallProvider;
