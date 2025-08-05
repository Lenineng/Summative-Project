const express = require('express');
const router = express.Router();
const { CourseOffering } = require('../models');

router.get('/', async (req, res) => {
  const items = await CourseOffering.findAll();
  res.json(items);
});

router.post('/', async (req, res) => {
  const item = await CourseOffering.create(req.body);
  res.status(201).json(item);
});

router.put('/:id', async (req, res) => {
  const item = await CourseOffering.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  await item.update(req.body);
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await CourseOffering.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  await item.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;
