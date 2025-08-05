require('dotenv').config(); // Load .env variables
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Optional: disables SQL logging in terminal
  }
);

const db = {};

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connection established.'))
  .catch(err => console.error('❌ Unable to connect to the database:', err));

// Load models
db.Manager = require('./Manager')(sequelize, DataTypes);
db.Module = require('./Module')(sequelize, DataTypes);
db.Cohort = require('./Cohort')(sequelize, DataTypes);
db.Class = require('./Class')(sequelize, DataTypes);
db.Student = require('./student')(sequelize, DataTypes);
db.Facilitator = require('./Facilitator')(sequelize, DataTypes);
db.Mode = require('./Mode')(sequelize, DataTypes);
db.Allocation = require('./Allocation')(sequelize, DataTypes); // AKA CourseOffering
db.ActivityTracker = require('./ActivityTracker')(sequelize, DataTypes);

// Define associations
db.Student.belongsTo(db.Class, { foreignKey: 'classId' });
db.Student.belongsTo(db.Cohort, { foreignKey: 'cohortId' });

db.Facilitator.belongsTo(db.Manager, { foreignKey: 'managerId' });

db.Class.belongsTo(db.Cohort, { foreignKey: 'cohortId' });

db.Allocation.belongsTo(db.Module, { foreignKey: 'moduleId' });
db.Allocation.belongsTo(db.Class, { foreignKey: 'classId' });
db.Allocation.belongsTo(db.Facilitator, { foreignKey: 'facilitatorId' });
db.Allocation.belongsTo(db.Mode, { foreignKey: 'modeId' });

db.ActivityTracker.belongsTo(db.Allocation, { foreignKey: 'allocationId' });

// Final export
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
