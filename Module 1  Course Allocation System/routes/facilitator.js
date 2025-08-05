const express = require('express');
const router = express.Router();
const { Facilitator } = require('../models');

/**
 * @swagger
 * tags:
 *   name: Facilitators
 *   description: API endpoints for managing facilitators
 */

/**
 * @swagger
 * /api/facilitators:
 *   get:
 *     summary: Get all facilitators
 *     tags: [Facilitators]
 *     responses:
 *       200:
 *         description: List of facilitators
 */
router.get('/', async (req, res) => {
  try {
    const facilitators = await Facilitator.findAll();
    res.status(200).json(facilitators);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch facilitators' });
  }
});

/**
 * @swagger
 * /api/facilitators:
 *   post:
 *     summary: Create a new facilitator
 *     tags: [Facilitators]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Facilitator created
 */
router.post('/', async (req, res) => {
  try {
    const facilitator = await Facilitator.create(req.body);
    res.status(201).json(facilitator);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create facilitator' });
  }
});

/**
 * @swagger
 * /api/facilitators/{id}:
 *   put:
 *     summary: Update a facilitator by ID
 *     tags: [Facilitators]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Facilitator ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Facilitator updated
 */
router.put('/:id', async (req, res) => {
  try {
    const facilitator = await Facilitator.findByPk(req.params.id);
    if (!facilitator) {
      return res.status(404).json({ error: 'Facilitator not found' });
    }
    await facilitator.update(req.body);
    res.status(200).json(facilitator);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update facilitator' });
  }
});

/**
 * @swagger
 * /api/facilitators/{id}:
 *   delete:
 *     summary: Delete a facilitator by ID
 *     tags: [Facilitators]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Facilitator ID
 *     responses:
 *       200:
 *         description: Facilitator deleted
 */
router.delete('/:id', async (req, res) => {
  try {
    const facilitator = await Facilitator.findByPk(req.params.id);
    if (!facilitator) {
      return res.status(404).json({ error: 'Facilitator not found' });
    }
    await facilitator.destroy();
    res.status(200).json({ message: 'Facilitator deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete facilitator' });
  }
});

module.exports = router;
