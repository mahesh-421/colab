import toast from 'react-hot-toast';

import { useDispatch } from 'react-redux';

import { changeShowVideoPage } from '../../../utils/redux/applicationStates';

const useLeaveVideo = () => {
  const dispatch = useDispatch();

  const leavevideocall = async ({ roomId }) => {
    try {
      const res = await fetch(`/api/room/leave/video/${roomId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (data.error) throw new Error(data.error);

      dispatch(changeShowVideoPage());
    } catch (error) {
      toast.error(error.message);
    } finally {
    }
  };
  return leavevideocall;
};

export default useLeaveVideo;
