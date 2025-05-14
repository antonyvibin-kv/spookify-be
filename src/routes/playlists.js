const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Playlist, Song } = require('../models');

// Get all public playlists
router.get('/', async (req, res) => {
  try {
    const playlists = await Playlist.findAll({
      where: { isPublic: true },
      include: [{ model: Song }]
    });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's playlists
router.get('/my-playlists', auth, async (req, res) => {
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

// Create playlist
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    const playlist = await Playlist.create({
      name,
      description,
      isPublic,
      userId: req.user.id
    });
    res.status(201).json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add song to playlist
router.post('/:id/songs/:songId', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    const song = await Song.findByPk(req.params.songId);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    await playlist.addSong(song);
    res.json({ message: 'Song added to playlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove song from playlist
router.delete('/:id/songs/:songId', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    const song = await Song.findByPk(req.params.songId);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    await playlist.removeSong(song);
    res.json({ message: 'Song removed from playlist' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update playlist
router.put('/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    const { name, description, isPublic } = req.body;
    await playlist.update({ name, description, isPublic });
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete playlist
router.delete('/:id', auth, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({
      where: { id: req.params.id, userId: req.user.id }
    });
    
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    await playlist.destroy();
    res.json({ message: 'Playlist deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 