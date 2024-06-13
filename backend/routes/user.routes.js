import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import {
  getUsersForVideoCall,
  getUsersForAudioCall,
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/video/:id', protectRoute, getUsersForVideoCall);
router.get('/audio/:id', protectRoute, getUsersForAudioCall);

export default router;
