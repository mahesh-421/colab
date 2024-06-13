import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  LocalUser,
  RemoteUser,
  useJoin,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
} from 'agora-rtc-react';

const VoiceCall = () => {
  const colabData = useSelector((store) => store.colabStates);

  const userData = useSelector((store) => store.userInfo.userData);
  const _id = userData?._id;

  // const appId = 'AIzaSyD0R5NI-iXAd1c0jqmn8ZQhdI6gnPaOddI';

  const { roomId } = useParams();

  // get local video and mic tracks
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(colabData.mic);

  // Join the channel
  useJoin(
    {
      appid: appId,
      channel: roomId,
      token: null,
      uid: _id,
    },
    colabData.activeConnection
  );

  usePublish([localMicrophoneTrack]);

  //remote users
  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  // play the remote user audio tracks
  audioTracks.forEach((track) => track.play());

  return (
    <div className="absolute -z-10">
      <LocalUser
        audioTrack={localMicrophoneTrack}
        micOn={colabData.mic}
        playAudio={colabData.mic}
      />
      {remoteUsers.map((user) => (
        <RemoteUser key={user.uid} user={user} />
      ))}
    </div>
  );
};

export default VoiceCall;
