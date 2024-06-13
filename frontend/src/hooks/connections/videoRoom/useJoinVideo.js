import toast from 'react-hot-toast';

import { useDispatch } from 'react-redux';

import {
  changeJoinRoom,
  changeShowVideoPage,
} from '../../../utils/redux/applicationStates';

const useJoinVideo = () => {
  const dispatch = useDispatch();

  const joinvideocall = async ({ roomId }) => {
    dispatch(changeJoinRoom());
    try {
      const res = await fetch(`/api/room/join/video/${roomId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      dispatch(changeShowVideoPage());
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(changeJoinRoom());
    }
  };
  return joinvideocall;
};

export default useJoinVideo;
