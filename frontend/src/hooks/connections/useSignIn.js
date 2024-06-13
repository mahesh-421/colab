import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import {
  changeClickedButton,
  changeAuthUser,
} from '../../utils/redux/applicationStates';
import { addUserData } from '../../utils/redux/userInfo';

const useSignIn = () => {
  const dispatch = useDispatch();

  const signin = async ({ username, password }) => {
    const success = handleInputError({
      username,
      password,
    });

    if (!success) return;

    dispatch(changeClickedButton());
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      //
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      //

      dispatch(changeAuthUser());
      dispatch(addUserData(data));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(changeClickedButton());
    }
  };
  return signin;
};

export default useSignIn;

function handleInputError({ username, password }) {
  if (!username.trim() || !password.trim()) {
    toast.error('Please Enter Valid Inputs');
    return;
  }
  return true;
}
