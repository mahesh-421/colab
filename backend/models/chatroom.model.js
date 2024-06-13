import mongoose from 'mongoose';

const chatroomSchema = new mongoose.Schema(
  {
    videoRoomId: {
      type: String,
      default: '',
    },
    audioRoomId: {
      type: String,
      default: '',
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

export default Chatroom;
