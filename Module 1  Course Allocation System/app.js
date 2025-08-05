require('dotenv').config();
const express = require('express');
const app = express();

const setupSwaggerDocs = require('./swagger');
const errorHandler = require('./middleware/errorHandler');

// Middleware to parse JSON
app.use(express.json());

// DB setup
const db = require('./models');
db.sequelize.sync()
  .then(() => console.log('✅ Database synced'))
  .catch((err) => console.error('❌ Failed to sync db:', err.message));

// Import routes
const courseOfferingRoutes = require('./routes/courseOffering');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/student');
const facilitatorRoutes = require('./routes/facilitator');
const managerRoutes = require('./routes/manager');
const cohortRoutes = require('./routes/cohort');
const moduleRoutes = require('./routes/module');
const classRoutes = require('./routes/class');
const modeRoutes = require('./routes/mode');
const activityLogRoutes = require('./routes/activityLog'); // ✅ Add activity logs route

// Route setup
app.use('/api/course-offerings', courseOfferingRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/facilitators', facilitatorRoutes);
app.use('/api/managers', managerRoutes);
app.use('/api/cohorts', cohortRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/modes', modeRoutes);
app.use('/api/activity-logs', activityLogRoutes); // ✅ Add route

// Swagger setup
setupSwaggerDocs(app);

// Global error handler
app.use(errorHandler);

module.exports = app;
