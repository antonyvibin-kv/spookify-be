const express = require('express');
const router = express.Router();
const { Song, User, UserFavorite } = require('../models');
const { Op } = require('sequelize');
const auth = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');

/**
 * @swagger
 * /api/songs:
 *   get:
 *     summary: Get all songs
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: List of all songs
 */
router.get('/', async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/songs/{id}:
 *   get:
 *     summary: Get a song by ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Song details
 *       404:
 *         description: Song not found
 */
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/songs/search/{query}:
 *   get:
 *     summary: Search songs by title or artist
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching songs
 */
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const songs = await Song.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { artist: { [Op.iLike]: `%${query}%` } }
        ]
      }
    });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/songs/{id}/favorite:
 *   post:
 *     summary: Add a song to user's favorites
 *     tags: [Songs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Song ID
 *     responses:
 *       200:
 *         description: Song added to favorites
 *       404:
 *         description: Song not found
 */
router.post('/:id/favorite', auth, async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the song is already in favorites
    const isFavorite = await user.hasFavorite(song);
    if (isFavorite) {
      return res.status(400).json({ error: 'Song is already in favorites' });
    }

    // Add to favorites using the UserFavorite model
    await UserFavorite.create({
      UserId: user.id,
      SongId: song.id
    });

    res.json({ message: 'Song added to favorites' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/songs/{id}/favorite:
 *   delete:
 *     summary: Remove a song from user's favorites
 *     tags: [Songs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Song ID
 *     responses:
 *       200:
 *         description: Song removed from favorites
 *       404:
 *         description: Song not found
 */
router.delete('/:id/favorite', auth, async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    const user = await User.findByPk(req.user.id);
    await user.removeFavorite(song);
    res.json({ message: 'Song removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 