const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { User, Song, Playlist } = require('../models');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Song, as: 'favorites' },
        { model: Playlist }
      ]
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, email, profilePicture } = req.body;
    const user = await User.findByPk(req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update({ username, email, profilePicture });
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's favorite songs
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const favorites = await user.getFavorites();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's playlists
router.get('/playlists', auth, async (req, res) => {
  try {
    const playlists = await Playlist.findAll({
      where: { userId: req.user.id },
      include: [{ model: Song }]
    });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 