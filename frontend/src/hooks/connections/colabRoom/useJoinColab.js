import toast from 'react-hot-toast';

import { useDispatch } from 'react-redux';

import {
  changeJoinRoom,
  changeShowColabPage,
} from '../../../utils/redux/applicationStates';

const useJoinColab = () => {
  const dispatch = useDispatch();

  const joincolab = async ({ roomId }) => {
    dispatch(changeJoinRoom());
    try {
      const res = await fetch(`/api/room/join/audio/${roomId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      dispatch(changeShowColabPage());
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(changeJoinRoom());
    }
  };
  return joincolab;
};

export default useJoinColab;
