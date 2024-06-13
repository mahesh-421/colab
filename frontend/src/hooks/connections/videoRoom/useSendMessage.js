import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { changeClickedButton } from '../../../utils/redux/applicationStates';

const useSendMessage = () => {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const sendMessage = async (message, fullName) => {
    dispatch(changeClickedButton());

    try {
      const res = await fetch(`/api/messages/send/${roomId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, fullName }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(changeClickedButton());
    }
  };
  return sendMessage;
};

export default useSendMessage;
