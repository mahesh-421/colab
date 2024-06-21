import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import roomRoutes from './routes/room.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';

import { rooms } from './socket/rooms.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

app.use(express.json()); // to parse the incoming reuests with JSON payloads (from req.body)
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/room', roomRoutes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

const expressServer = app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is running on port ${PORT}`);
});

const io = new Server(expressServer);

export const roomConnection = io.of('/rooms');
rooms();
