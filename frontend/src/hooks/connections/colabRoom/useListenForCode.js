import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useSocketColabContext } from '../../socket/SocketColabProvider';
import toast from 'react-hot-toast';

import { changeBroadcastCodes } from '../../../utils/redux/compilerSlice';

const useListenCode = () => {
  const { socket } = useSocketColabContext();

  const compilerdata = useSelector((store) => store.compilerdata);

  const { roomId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (compilerdata.broadcastCodes) {
      dispatch(changeBroadcastCodes());
      // console.log('send code');
      socket?.emit('broadcastCode', {
        codes: compilerdata.codes,
        roomId,
      });
    }
  }, [compilerdata.broadcastCodes]);
};
export default useListenCode;
