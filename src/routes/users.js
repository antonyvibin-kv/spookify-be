const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { User, Song, Playlist } = require('../models');

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile with favorites and playlists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
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

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               profilePicture:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
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

/**
 * @swagger
 * /api/users/favorites:
 *   get:
 *     summary: Get user's favorite songs
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's favorite songs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 */
router.get('/favorites', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    const favorites = await user.getFavorites();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users/playlists:
 *   get:
 *     summary: Get user's playlists
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 */
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