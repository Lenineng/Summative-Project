const express = require('express');
const router = express.Router();
const activityLogController = require('../controllers/activityLogController');
const authenticate = require('../middlewares/auth');

// Route: Facilitators submit activity logs
router.post('/', authenticate('facilitator'), activityLogController.createActivityLog);

// Route: Facilitators view their own logs
router.get('/my-logs', authenticate('facilitator'), activityLogController.getLogsByFacilitator);

// Route: Managers view all logs
router.get('/', authenticate('manager'), activityLogController.getAllLogs);

// Route: Facilitators update their log
router.put('/:id', authenticate('facilitator'), activityLogController.updateLog);

// Route: Managers can delete logs if needed
router.delete('/:id', authenticate('manager'), activityLogController.deleteLog);

module.exports = router;
