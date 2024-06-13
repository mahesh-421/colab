import toast from 'react-hot-toast';

import { useDispatch } from 'react-redux';

import { changeShowColabPage } from '../../../utils/redux/applicationStates';

const useLeaveColab = () => {
  const dispatch = useDispatch();

  const leavecolab = async ({ roomId }) => {
    try {
      const res = await fetch(`/api/room/leave/audio/${roomId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (data.error) throw new Error(data.error);

      dispatch(changeShowColabPage());
    } catch (error) {
      toast.error(error.message);
    } finally {
    }
  };
  return leavecolab;
};

export default useLeaveColab;
