import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import {
  changeCreateRoom,
  changeShowVideoPage,
} from '../../../utils/redux/applicationStates';

const useCreateVideo = () => {
  const dispatch = useDispatch();

  const createvideocall = async ({ roomId }) => {
    dispatch(changeCreateRoom());
    try {
      const res = await fetch(`/api/room/create/video/${roomId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      dispatch(changeShowVideoPage());

      //
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(changeCreateRoom());
    }
  };
  return createvideocall;
};

export default useCreateVideo;
