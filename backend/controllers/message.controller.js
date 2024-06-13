import Chatroom from '../models/chatroom.model.js';
import Message from '../models/message.model.js';
import { roomConnection } from '../server.js';
// import { io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
  try {
    const { message, fullName } = req.body;
    const { id: videoRoomId } = req.params;
    const senderId = req.user._id;

    let chats = await Chatroom.findOne({ videoRoomId });

    const newMessage = new Message({
      videoRoomId,
      senderId,
      message,
      fullName,
    });

    if (newMessage) {
      chats.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // this will run in parallel

    await Promise.all([chats.save(), newMessage.save()]);
    res.status(201).json(newMessage);

    // SOCKET IO FUNCTIONALITY WILL GO HERE
    roomConnection.to(videoRoomId).emit('newMessage', {
      message: newMessage,
    });

    //
  } catch (error) {
    console.log('Error in sendMessage controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: videoRoomId } = req.params;
    // const senderId = req.user._id;

    const chats = await Chatroom.findOne({ videoRoomId }).populate('messages');

    if (!chats) return res.status(200).json([]);

    const messages = chats.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log('Error in sendMessage controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
