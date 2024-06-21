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

const SocketContext = createContext();

export const SocketVideoCallProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const applicationStates = useSelector((store) => store.applicationStates);

  const userData = useSelector((store) => store.userInfo.userData);
  const _id = userData?._id;

  const { roomId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (applicationStates.showVideoPage && applicationStates.authUser) {
      // const socket = io('http://localhost:5000');
      const socket = io('/rooms');

      setSocket(socket);

      socket.emit('createVideoRoom', { roomId });

      //

      socket?.on('newParticipant', ({ participant }) => {
        setTimeout(() => {
          toast.success(participant.fullName + ' Joined.');
        }, 2000);
        dispatch(addParticipant(participant));
      });

      socket?.on('allParticipants', ({ participants }) => {
        dispatch(addAllParticipants(participants));
      });

      //

      socket?.on('userLeft', ({ participants }) => {
        dispatch(addAllParticipants(participants));
      });

      //

      socket?.on('newMessage', ({ message }) => {
        dispatch(addMessage(message));
      });

      //

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [applicationStates.showVideoPage]);

  return <SocketContext.Provider>{children}</SocketContext.Provider>;
};
