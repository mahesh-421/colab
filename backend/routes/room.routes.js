import express from 'express';
import {
  createVideoRoom,
  joinVideoRoom,
  leaveVideoRoom,
  createAudioRoom,
  joinAudioRoom,
  leaveAudioRoom,
} from '../controllers/room.controller.js';

import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/create/video/:id', protectRoute, createVideoRoom);
router.post('/join/video/:id', protectRoute, joinVideoRoom);
router.post('/leave/video/:id', protectRoute, leaveVideoRoom);

router.post('/join/audio/:id', protectRoute, joinAudioRoom);
router.post('/create/audio/:id', protectRoute, createAudioRoom);
router.post('/leave/audio/:id', protectRoute, leaveAudioRoom);

export default router;
