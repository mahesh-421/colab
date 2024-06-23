import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { changeClickedButton } from '../../../utils/redux/applicationStates';
import { useEffect } from 'react';

import { addAllParticipants } from '../../../utils/redux/videoCallSlice';

const useGetVideoParticipants = () => {
  const dispatch = useDispatch();

  const { roomId } = useParams();

  useEffect(() => {
    const getparticipants = async () => {
      dispatch(changeClickedButton());
      try {
        const res = await fetch(`/api/users/video/${roomId}`);
        const data = await res.json();
        // console.log(data);
        if (data.error) throw new Error(data.error);

        dispatch(addAllParticipants(data));

        //
      } catch (error) {
        toast.error(error.message);
      } finally {
        dispatch(changeClickedButton());
      }
    };

    getparticipants();
  }, []);
  return {};
};

export default useGetVideoParticipants;
