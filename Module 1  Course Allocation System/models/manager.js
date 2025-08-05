module.exports = (sequelize, DataTypes) => {
  const Manager = sequelize.define('Manager', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: DataTypes.STRING
  });

  Manager.associate = (models) => {
    Manager.hasMany(models.Facilitator, { foreignKey: 'managerId' });
  };

  return Manager;
};
