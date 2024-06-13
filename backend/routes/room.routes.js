import express from 'express';
import {
  createVideoRoom,
  joinVideoRoom,
  leaveVideoRoom,
  createAudioRoom,
  joinAudioRoom,
  leaveAudioRoom,
} from '../controllers/room.controller.js';

import { consumer, broadcaster } from '../controllers/streams.controller.js';

import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/create/video/:id', protectRoute, createVideoRoom);
router.post('/join/video/:id', protectRoute, joinVideoRoom);
router.post('/leave/video/:id', protectRoute, leaveVideoRoom);

router.post('/join/audio/:id', protectRoute, joinAudioRoom);
router.post('/create/audio/:id', protectRoute, createAudioRoom);
router.post('/leave/audio/:id', protectRoute, leaveAudioRoom);

router.post('/consumer', protectRoute, consumer);
router.post('/broadcast', protectRoute, broadcaster);

export default router;
