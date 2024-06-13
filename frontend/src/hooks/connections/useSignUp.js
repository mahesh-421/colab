import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import {
  changeClickedButton,
  changeAuthUser,
} from '../../utils/redux/applicationStates';
import { addUserData } from '../../utils/redux/userInfo';

const useSignUp = () => {
  const dispatch = useDispatch();

  const signup = async ({ fullName, username, password, confirmPassword }) => {
    const success = handleInputError({
      fullName,
      username,
      password,
      confirmPassword,
    });
    if (!success) return;

    dispatch(changeClickedButton());
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
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
      //
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(changeClickedButton());
    }
  };

  return signup;
};

export default useSignUp;

function handleInputError({ fullName, username, password, confirmPassword }) {
  if (
    !fullName.trim() ||
    !username.trim() ||
    !password.trim() ||
    !confirmPassword.trim()
  ) {
    toast.error('Please Enter Vaild Inputs');
    return false;
  }
  if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(fullName)) {
    toast.error('Please Enter Full Name');
    return false;
  }
  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)) {
    toast.error(
      'Password should contain small letters, capital letters, and digits, Should be longer than 8 character'
    );
    return false;
  }
  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }
  return true;
}
