module.exports = (sequelize, DataTypes) => {
  const ActivityLog = sequelize.define('ActivityLog', {
    weekNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    facilitatorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    allocationId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    attendance: {
  type: DataTypes.JSON,
  defaultValue: []
},

    formativeOneGrading: {
      type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
      defaultValue: 'Not Started',
    },
    formativeTwoGrading: {
      type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
      defaultValue: 'Not Started',
    },
    summativeGrading: {
      type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
      defaultValue: 'Not Started',
    },
    courseModeration: {
      type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
      defaultValue: 'Not Started',
    },
    intranetSync: {
      type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
      defaultValue: 'Not Started',
    },
    gradeBookStatus: {
      type: DataTypes.ENUM('Done', 'Pending', 'Not Started'),
      defaultValue: 'Not Started',
    },
    submittedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: true,
  });

  ActivityLog.associate = (models) => {
    ActivityLog.belongsTo(models.CourseOffering, {
      foreignKey: 'allocationId',
      onDelete: 'CASCADE',
    });

    ActivityLog.belongsTo(models.User, {
      foreignKey: 'facilitatorId',
      as: 'facilitator',
      onDelete: 'CASCADE',
    });
  };

  return ActivityLog;
};
