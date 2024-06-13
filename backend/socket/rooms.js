import { roomConnection } from '../server.js';

export const rooms = () => {
  roomConnection.on('connection', (socket) => {
    console.log("user's socketID", socket.id);

    //

    socket.on('createVideoRoom', ({ roomId }) => {
      socket.join(roomId);
    });
    socket.on('createColabRoom', ({ roomId }) => {
      socket.join(roomId);
    });
    //
    socket.on('broadcastCode', ({ roomId, codes }) => {
      socket.to(roomId).emit('newCodes', {
        codes,
      });
    });

    //

    socket.on('disconnect', () => {
      console.log('user disconnect ', socket.id);
    });
  });
};
