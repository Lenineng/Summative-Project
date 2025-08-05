module.exports = (sequelize, DataTypes) => {
  const Allocation = sequelize.define('Allocation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    trimester: DataTypes.STRING,
    year: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  });

  Allocation.associate = (models) => {
    Allocation.belongsTo(models.Module, { foreignKey: 'moduleId' });
    Allocation.belongsTo(models.Class, { foreignKey: 'classId' });
    Allocation.belongsTo(models.Facilitator, { foreignKey: 'facilitatorId' });
    Allocation.belongsTo(models.Mode, { foreignKey: 'modeId' });
  };

  return Allocation;
};
