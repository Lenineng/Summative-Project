module.exports = (sequelize, DataTypes) => {
  const ActivityTracker = sequelize.define('ActivityTracker', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    allocationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Allocations', // Must match the actual table name of your Allocation model
        key: 'id',
      },
    },
    week: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activitiesCompleted: {
      type: DataTypes.TEXT, // A JSON string or detailed notes
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('submitted', 'missed', 'pending'),
      defaultValue: 'pending',
    },
  }, {
    tableName: 'ActivityTrackers', // Explicit table name
    timestamps: true, // includes createdAt and updatedAt
  });

  return ActivityTracker;
};
