import { useState, useEffect, createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import toast from 'react-hot-toast';

import {
  addParticipant,
  addAllParticipants,
} from '../../utils/redux/colabSlice';

import {
  addAllCodes,
  changeBroadcastCodes,
} from '../../utils/redux/compilerSlice';

const SocketContext = createContext();

export const useSocketColabContext = () => {
  return useContext(SocketContext);
};

export const SocketColabProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const applicationStates = useSelector((store) => store.applicationStates);
  const compilerdata = useSelector((store) => store.compilerdata);

  const { roomId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (applicationStates.showColabPage && applicationStates.authUser) {
      // const socket = io('http://18.142.186.169:5000', {});
      // const socket = io('http://localhost:5000', {});
      const socket = io('/rooms');
      setSocket(socket);

      socket.emit('createColabRoom', { roomId });

      //--------------------------------------------------PARTICIPANTS------------------------------------------------------
      socket?.on('newParticipant', ({ participant }) => {
        setTimeout(() => {
          dispatch(changeBroadcastCodes()); // sending all the codes to newly connected user
          toast.success(participant.fullName + ' Joined.');
        }, 500);

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

      //-----------------------------------------------------listening for new codes------------------------------------------

      socket?.on('newCodes', ({ codes }) => {
        // console.log('received code');
        dispatch(dispatch(addAllCodes(codes)));
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [applicationStates.showColabPage]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
