import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import { changeClickedButton } from '../../../utils/redux/applicationStates';
import { addAllMessages } from '../../../utils/redux/videoCallSlice';

const useGetMessage = () => {
  const showVideoPage = useSelector(
    (store) => store.applicationStates.showVideoPage
  );

  const { roomId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const getMessage = async () => {
      dispatch(changeClickedButton());

      try {
        const res = await fetch(`/api/messages/${roomId}`);

        const data = await res.json();

        console.log(data);
        if (data.error) throw new Error(data.error);
        dispatch(addAllMessages(data));

        //
      } catch (error) {
        toast.error(error.message);
      } finally {
        dispatch(changeClickedButton());
      }
    };

    getMessage();
  }, []);
};

export default useGetMessage;
