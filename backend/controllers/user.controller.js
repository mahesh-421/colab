import User from '../models/user.model.js';

export const getUsersForVideoCall = async (req, res) => {
  try {
    //
    // const loggedInUserId = req.user._id;
    const { id: videoRoomId } = req.params;

    const filteredUsers = await User.find({
      videoRoomId,
    }).select('-password');

    if (filteredUsers) res.status(200).json(filteredUsers);
    else return res.status(400).json({ error: 'Participants cannot be found' });

    //
  } catch (error) {
    console.error('Error in getUserForSideBar: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUsersForAudioCall = async (req, res) => {
  try {
    //
    // const loggedInUserId = req.user._id;
    const { id: audioRoomId } = req.params;

    const filteredUsers = await User.find({
      audioRoomId,
    }).select('-password');

    if (filteredUsers) res.status(200).json(filteredUsers);
    else return res.status(400).json({ error: 'Participants cannot be found' });

    //
  } catch (error) {
    console.error('Error in getUserForSideBar: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
