const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Playlist, Song } = require('../models');

/**
 * @swagger
 * /api/playlists:
 *   get:
 *     summary: Get all public playlists
 *     tags: [Playlists]
 *     responses:
 *       200:
 *         description: List of public playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 */
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

/**
 * @swagger
 * /api/playlists/my-playlists:
 *   get:
 *     summary: Get user's playlists
 *     tags: [Playlists]
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

/**
 * @swagger
 * /api/playlists:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 */
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

/**
 * @swagger
 * /api/playlists/{id}/songs/{songId}:
 *   post:
 *     summary: Add a song to a playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Song added to playlist successfully
 *       404:
 *         description: Playlist or song not found
 */
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

/**
 * @swagger
 * /api/playlists/{id}/songs/{songId}:
 *   delete:
 *     summary: Remove a song from a playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: songId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Song removed from playlist successfully
 *       404:
 *         description: Playlist or song not found
 */
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

/**
 * @swagger
 * /api/playlists/{id}:
 *   put:
 *     summary: Update a playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Playlist updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: Playlist not found
 */
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

/**
 * @swagger
 * /api/playlists/{id}:
 *   delete:
 *     summary: Delete a playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Playlist deleted successfully
 *       404:
 *         description: Playlist not found
 */
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