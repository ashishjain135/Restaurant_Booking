

const express = require('express');
const router = express.Router();


const protect = require('../middleware/authMiddleware');

const {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  deleteUserAccount,
} = require('../controllers/userController');



router.get('/', protect, getUserProfile);
router.put('/', protect, updateUserProfile);
router.put('/password', protect, updateUserPassword);
router.delete('/', protect, deleteUserAccount);

const User = require('../models/UserModel');

router.get('/test-user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

