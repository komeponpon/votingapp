// pages/api/websocket.js
import { Server } from 'socket.io';

// Next.jsのAPIルートはデフォルトでNode.jsのHTTP Serverを使用するため、
// これを上書きする必要があります。
const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket.IO already running');
  } else {
    console.log('Initializing Socket.IO');
    const io = new Server(res.socket.server);

    io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('vote', (data) => {
        console.log('Vote received:', data);
        io.emit('voteUpdate', data);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default SocketHandler;