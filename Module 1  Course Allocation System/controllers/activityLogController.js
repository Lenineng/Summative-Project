const { ActivityTracker, Allocation } = require('../models');

// CREATE
exports.createActivityLog = async (req, res, next) => {
  try {
    const { allocationId, week, activitiesCompleted, status } = req.body;
    const log = await ActivityTracker.create({ allocationId, week, activitiesCompleted, status });
    res.status(201).json(log);
  } catch (err) {
    next(err);
  }
};

// READ ALL (Managers only)
exports.getAllLogs = async (req, res, next) => {
  try {
    const logs = await ActivityTracker.findAll({
      include: [{ model: Allocation }],
    });
    res.json(logs);
  } catch (err) {
    next(err);
  }
};

// READ by facilitator (auth-based in real apps)
exports.getLogsByFacilitator = async (req, res, next) => {
  try {
    const { facilitatorId } = req.params;
    const logs = await ActivityTracker.findAll({
      include: {
        model: Allocation,
        where: { facilitatorId },
      },
    });
    res.json(logs);
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateLog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [updated] = await ActivityTracker.update(req.body, {
      where: { id },
    });
    if (!updated) return res.status(404).json({ message: 'Log not found' });
    const log = await ActivityTracker.findByPk(id);
    res.json(log);
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteLog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await ActivityTracker.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Log deleted' });
  } catch (err) {
    next(err);
  }
};
