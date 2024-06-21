import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import VideoControlers from '../VideoControlers';

// import VideoCallProvider from '../../../hooks/socket/VideoCallProvider';

const VideoContainer = () => {
  const [UID, setUID] = useState('');

  // VideoCallProvider();

  const videoCallData = useSelector((store) => store.videoCallStates);
  const userData = useSelector((store) => store.userInfo.userData);
  // const _id = userData?._id;
  // const fullName = userData?.fullName;

  // const { roomId } = useParams();

  return (
    <div className="relative w-full h-full">
      <div className="absolute w-full h-full p-8 z-10 ">
        <div className="relative h-[85%] rounded-lg">
          <div className="flex flex-wrap py-10 justify-center items-center h-full w-full border-2 rounded-lg border-gray-500 overflow-scroll no-scrollbar ">
            <div className="relative h-[14rem] w-[22rem] m-3 hover:outline hover:outline-offset-8 outline-gray-500 rounded-lg">
              <video id="localVideo" autoPlay muted></video>
            </div>
            {/* <div className="relative h-[14rem] w-[22rem] m-3 hover:outline hover:outline-offset-8 outline-gray-500 rounded-lg">
              <div id="videoContainer"></div>
            </div> */}
            <div className="relative h-[14rem] w-[22rem] m-3 hover:outline hover:outline-offset-8 outline-gray-500 rounded-lg">
              <video id="remoteVideo" autoPlay muted></video>
            </div>
          </div>
        </div>
      </div>

      <div></div>
      <VideoControlers />
    </div>
  );
};

export default VideoContainer;

// const handleFlexed = (id) => {
//   setUID(id);
// };

// const handleFull = (id) => {
//   UID === id ? setUID(false) : setUID(id);
// };

// <>
// <>
//   {!UID && (
//     <div className="relative w-full h-full">
//       <div className="absolute w-full h-full p-8 ">
//         <div className="relative h-[85%] rounded-lg">
//           <div className="flex flex-wrap py-10 justify-center items-center h-full w-full border-2 rounded-lg border-gray-500 overflow-scroll no-scrollbar ">
//             <div
//               className="relative h-[14rem] w-[22rem] m-3 hover:outline hover:outline-offset-8 outline-gray-500 rounded-lg"
//               onClick={() => handleFlexed(_id)}
//             >
//               <LocalUser
//                 audioTrack={localMicrophoneTrack}
//                 videoTrack={localCameraTrack}
//                 cameraOn={videoCallData.camera}
//                 micOn={videoCallData.mic}
//                 playAudio={videoCallData.mic}
//                 playVideo={videoCallData.camera}
//                 className=" rounded-lg"
//               />
//               <span className="absolute bottom-0 text-gray-400  bg-slate-700 m-1 p-2 opacity-70 rounded-lg">
//                 {fullName}
//               </span>
//             </div>

//             {remoteUsers.map((user) => (
//               <div
//                 key={user.uid}
//                 className="relative h-[14rem] w-[22rem] m-3 aspect-video hover:outline hover:outline-offset-8 outline-gray-500 rounded-lg"
//                 onClick={() => handleFlexed(user.uid)}
//               >
//                 <RemoteUser user={user} className=" rounded-lg " />

//                 <span className="absolute bottom-0 text-gray-400 bg-slate-700 m-1 p-2 opacity-70 rounded-lg">
//                   {
//                     videoCallData.participants?.find(
//                       (participant) => participant._id === user.uid
//                     )?.fullName
//                   }
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <VideoControlers />
//     </div>
//   )}
// </>
// <>
//   {UID && (
//     <div className="relative w-full h-full">
//       <div className="absolute flex w-full h-full p-8 ">
//         <div className="relative h-[85%] w-[70%] rounded-lg">
//           <div className="flex p-5 justify-center items-center h-full w-full border-2 rounded-lg border-gray-500 ">
//             {UID === _id && (
//               <div
//                 className="relative w-full h-full hover:outline hover:outline-offset-8 hover:cursor-pointer outline-gray-500 rounded-lg"
//                 onClick={() => handleFull(_id)}
//               >
//                 <LocalUser
//                   audioTrack={localMicrophoneTrack}
//                   videoTrack={localCameraTrack}
//                   cameraOn={videoCallData.camera}
//                   micOn={videoCallData.mic}
//                   playAudio={videoCallData.mic}
//                   playVideo={videoCallData.camera}
//                   className=" rounded-lg"
//                 />
//                 <span className="absolute bottom-0 text-gray-400 bg-slate-700 m-1 p-2 opacity-70 rounded-lg">
//                   {fullName}
//                 </span>
//               </div>
//             )}

//             {remoteUsers.map((user) => {
//               return (
//                 // UID !== remoteId.id && (
//                 UID === user.uid && (
//                   <div
//                     key={user.uid}
//                     className="relative h-full w-full aspect-video hover:outline hover:outline-offset-8 hover:cursor-pointer outline-gray-500 rounded-lg"
//                     onClick={() => handleFull(user.uid)}
//                   >
//                     <RemoteUser user={user} className=" rounded-lg " />
//                     <span className="absolute bottom-0 text-gray-400 bg-slate-700 m-1 p-2 opacity-70 rounded-lg">
//                       {
//                         videoCallData.participants?.find(
//                           (participant) => participant._id === user.uid
//                         )?.fullName
//                       }
//                     </span>
//                   </div>
//                 )
//               );
//             })}
//           </div>
//         </div>
//         <div className="relative h-[85%] w-[30%] rounded-lg">
//           <div className="flex flex-wrap py-5 justify-center items-center h-full w-full border-2 rounded-lg border-gray-500 overflow-scroll no-scrollbar ">
//             {UID !== _id && (
//               <div
//                 className="relative h-[14rem] w-[20rem] m-5 hover:outline hover:outline-offset-8 hover:cursor-pointer outline-gray-500 rounded-lg"
//                 onClick={() => handleFull(_id)}
//               >
//                 <LocalUser
//                   audioTrack={localMicrophoneTrack}
//                   videoTrack={localCameraTrack}
//                   cameraOn={videoCallData.camera}
//                   micOn={videoCallData.mic}
//                   playAudio={videoCallData.mic}
//                   playVideo={videoCallData.camera}
//                   className=" rounded-lg"
//                 />
//                 <span className="absolute bottom-0 text-gray-400 bg-slate-700 m-1 p-2 opacity-70 rounded-lg">
//                   {fullName}
//                 </span>
//               </div>
//             )}
//             {remoteUsers.map((user) => {
//               return (
//                 // UID !== remoteId.id && (
//                 UID !== user.uid && (
//                   <div
//                     key={user.uid}
//                     className="relative h-[14rem] w-[22rem] m-5 aspect-video hover:outline hover:outline-offset-8 hover:cursor-pointer outline-gray-500 rounded-lg"
//                     onClick={() => handleFull(user.uid)}
//                   >
//                     <RemoteUser user={user} className=" rounded-lg " />
//                     <span className="absolute bottom-0 text-gray-400 bg-slate-700 m-1 p-2 opacity-70 rounded-lg">
//                       {
//                         videoCallData.participants?.find(
//                           (participant) => participant._id === user.uid
//                         )?.fullName
//                       }
//                     </span>
//                   </div>
//                 )
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <VideoControlers />
//     </div>
//   )}
// </>
// </>
