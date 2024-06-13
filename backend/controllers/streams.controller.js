import webrtc from 'wrtc';

let senderStream;

export const consumer = async ({ body }, res) => {
  try {
    const peer = new webrtc.RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org',
        },
      ],
    });
    const desc = new webrtc.RTCSessionDescription(body.payload.sdp);
    await peer.setRemoteDescription(desc);
    senderStream
      .getTracks()
      .forEach((track) => peer.addTrack(track, senderStream));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
      sdp: peer.localDescription,
    };

    res.json(payload);

    //
  } catch (error) {
    console.log('Error in consumer controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const broadcaster = async ({ body }, res) => {
  try {
    // console.log(body);
    const peer = new webrtc.RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org',
        },
      ],
    });
    peer.ontrack = (e) => handleTrackEvent(e, peer);
    const desc = new webrtc.RTCSessionDescription(body.payload.sdp);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    const payload = {
      sdp: peer.localDescription,
    };

    res.json(payload);

    //
  } catch (error) {
    console.log('Error in broadcaster controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

function handleTrackEvent(e, peer) {
  senderStream = e.streams[0];
}
