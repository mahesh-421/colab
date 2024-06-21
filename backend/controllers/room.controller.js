import User from '../models/user.model.js';
import Chatroom from '../models/chatroom.model.js';
import Message from '../models/message.model.js';
// import { io } from '../socket/socket.js';
import { roomConnection } from '../server.js';

export const createVideoRoom = async (req, res) => {
  try {
    const { id: videoRoomId } = req.params;
    const _id = req.user._id;
    //made new room in chatroom
    const chatroom = await Chatroom.create({ videoRoomId });

    //userjoined the room
    await User.updateOne({ _id }, { $set: { videoRoomId } });

    await chatroom.save();

    res.status(201).json({
      _id: videoRoomId,
      message: 'Video Room is created',
    });
    //
  } catch (error) {
    console.log('Error in createVideoRoom controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const joinVideoRoom = async (req, res) => {
  try {
    const { id: videoRoomId } = req.params;
    const _id = req.user._id;

    const roomToConnect = await Chatroom.findOne({ videoRoomId });
    if (!roomToConnect) {
      return res
        .status(400)
        .json({ error: 'Please enter Valid room Id or Generate New Room' });
    }

    // joined room
    await User.updateOne({ _id }, { $set: { videoRoomId } });

    const newParticipant = await User.findOne({ _id });

    roomConnection.to(videoRoomId).emit('newParticipant', {
      participant: newParticipant,
    });

    ///

    res.status(201).json({
      _id: videoRoomId,
      message: 'Video Room is Joined',
    });

    //
  } catch (error) {
    console.log('Error in joinVideoRoom controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const leaveVideoRoom = async (req, res) => {
  try {
    const { id: videoRoomId } = req.params;
    const _id = req.user._id;

    // leave room in user
    await User.updateOne({ _id }, { $set: { videoRoomId: '' } });

    const participantsInRoom = await User.findOne({ videoRoomId });

    //destroying the room
    if (!participantsInRoom) {
      await Message.deleteMany({ videoRoomId });
      await Chatroom.deleteOne({ videoRoomId });
    }

    const allParticipants = await User.find({
      _id: { $ne: _id },
      videoRoomId,
    }).select('-password');

    if (allParticipants)
      roomConnection.to(videoRoomId).emit('userLeft', {
        participants: allParticipants,
      });

    //
    res.status(201).json({
      message: 'Video Room Left Successfully',
    });

    //
  } catch (error) {
    console.log('Error in leaveVideoRoom controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createAudioRoom = async (req, res) => {
  try {
    const { id: audioRoomId } = req.params;
    const _id = req.user._id;

    //made new room in chatroom
    const chatroom = await Chatroom.create({ audioRoomId });

    //userjoined the room
    await User.updateOne({ _id }, { $set: { audioRoomId } });

    await chatroom.save();

    res.status(201).json({
      _id: audioRoomId,
      message: 'Audio Room is created',
    });
    //
  } catch (error) {
    console.log('Error in createAudioRoom controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const joinAudioRoom = async (req, res) => {
  try {
    const { id: audioRoomId } = req.params;
    const _id = req.user._id;

    const roomToConnect = await Chatroom.findOne({ audioRoomId });
    if (!roomToConnect) {
      return res
        .status(400)
        .json({ error: 'Please enter Valid room Id or Generate New Room' });
    }

    // joined room
    await User.updateOne({ _id }, { $set: { audioRoomId } });

    const newParticipant = await User.findOne({ _id });

    roomConnection.to(audioRoomId).emit('newParticipant', {
      participant: newParticipant,
    });

    ///

    res.status(201).json({
      _id: audioRoomId,
      message: 'Audio Room is Joined',
    });

    //
  } catch (error) {
    console.log('Error in joinAudioRoom controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const leaveAudioRoom = async (req, res) => {
  try {
    const { id: audioRoomId } = req.params;
    const _id = req.user._id;

    // leave room in user
    await User.updateOne({ _id }, { $set: { audioRoomId: '' } });

    const participantsInRoom = await User.findOne({ audioRoomId });

    //destroying the room
    if (!participantsInRoom) {
      await Message.deleteMany({ audioRoomId });
      await Chatroom.deleteOne({ audioRoomId });
    }

    const allParticipants = await User.find({
      _id: { $ne: _id },
      audioRoomId,
    }).select('-password');

    if (allParticipants)
      roomConnection.to(audioRoomId).emit('userLeft', {
        participants: allParticipants,
      });

    //
    res.status(201).json({
      message: 'Audio Room Left Successfully',
    });

    //
  } catch (error) {
    console.log('Error in leaveAudioRoom controller', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
