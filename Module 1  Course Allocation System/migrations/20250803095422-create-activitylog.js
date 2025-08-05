'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ActivityLogs', {
     id: {
  allowNull: false,
  primaryKey: true,
  type: Sequelize.UUID,
  defaultValue: Sequelize.UUIDV4,
},

      weekNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      facilitatorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      allocationId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'CourseOfferings',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      attendance: {
  type: Sequelize.JSON,
  allowNull: false,
  defaultValue: JSON.stringify([])
},

      formativeOneGrading: {
        type: Sequelize.ENUM('Done', 'Pending', 'Not Started'),
        defaultValue: 'Not Started',
      },
      formativeTwoGrading: {
        type: Sequelize.ENUM('Done', 'Pending', 'Not Started'),
        defaultValue: 'Not Started',
      },
      summativeGrading: {
        type: Sequelize.ENUM('Done', 'Pending', 'Not Started'),
        defaultValue: 'Not Started',
      },
      courseModeration: {
        type: Sequelize.ENUM('Done', 'Pending', 'Not Started'),
        defaultValue: 'Not Started',
      },
      intranetSync: {
        type: Sequelize.ENUM('Done', 'Pending', 'Not Started'),
        defaultValue: 'Not Started',
      },
      gradeBookStatus: {
        type: Sequelize.ENUM('Done', 'Pending', 'Not Started'),
        defaultValue: 'Not Started',
      },
      submittedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ActivityLogs');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_ActivityLogs_formativeOneGrading";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_ActivityLogs_formativeTwoGrading";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_ActivityLogs_summativeGrading";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_ActivityLogs_courseModeration";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_ActivityLogs_intranetSync";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_ActivityLogs_gradeBookStatus";');
  }
};
