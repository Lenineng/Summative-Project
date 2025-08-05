const express = require('express');
const router = express.Router();
const { Manager } = require('../models');

router.get('/', async (req, res) => {
  const items = await Manager.findAll();
  res.json(items);
});

router.post('/', async (req, res) => {
  const item = await Manager.create(req.body);
  res.status(201).json(item);
});

router.put('/:id', async (req, res) => {
  const item = await Manager.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  await item.update(req.body);
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  const item = await Manager.findByPk(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  await item.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;
