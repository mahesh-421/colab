import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import {
  changeClickedButton,
  changeAuthUser,
} from '../../utils/redux/applicationStates';
import { removeUserData } from '../../utils/redux/userInfo';

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch(changeClickedButton());
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      dispatch(removeUserData());
      dispatch(changeAuthUser());
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(changeClickedButton());
    }
  };
  return logout;
};

export default useLogout;
