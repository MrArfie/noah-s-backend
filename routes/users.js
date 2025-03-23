const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure this path is correct

// 📋 GET all users (for admin panel)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Hide passwords
    res.status(200).json(users);
  } catch (err) {
    console.error('❌ Failed to fetch users:', err.message);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});

// 🔄 UPDATE user role by ID
router.patch('/:id', async (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ message: 'Role is required' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('❌ Failed to update user role:', err.message);
    res.status(500).json({ message: 'Server error while updating role' });
  }
});

// 🗑️ DELETE a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete user:', err.message);
    res.status(500).json({ message: 'Server error while deleting user' });
  }
});

module.exports = router;
