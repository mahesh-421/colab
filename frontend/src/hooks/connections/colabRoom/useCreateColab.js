import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import {
  changeCreateRoom,
  changeShowColabPage,
} from '../../../utils/redux/applicationStates';

const useCreateColab = () => {
  const dispatch = useDispatch();

  const createcolab = async ({ roomId }) => {
    dispatch(changeCreateRoom());
    try {
      const res = await fetch(`/api/room/create/audio/${roomId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      dispatch(changeShowColabPage());

      //
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(changeCreateRoom());
    }
  };
  return createcolab;
};

export default useCreateColab;
