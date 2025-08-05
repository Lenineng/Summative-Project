const express = require('express');
const router = express.Router();
const activityLogController = require('../controllers/activityLogController');
const { authenticate, authorize } = require('../middleware/auth');

// Route: Facilitators submit activity logs
router.post('/', authenticate, authorize('facilitator'), activityLogController.createActivityLog);

// Route: Facilitators view their own logs
router.get('/my-logs', authenticate, authorize('facilitator'), activityLogController.getLogsByFacilitator);

// Route: Managers view all logs
router.get('/', authenticate, authorize('manager'), activityLogController.getAllLogs);

// Route: Facilitators update their log
router.put('/:id', authenticate, authorize('facilitator'), activityLogController.updateLog);

// Route: Managers can delete logs if needed
router.delete('/:id', authenticate, authorize('manager'), activityLogController.deleteLog);

module.exports = router;