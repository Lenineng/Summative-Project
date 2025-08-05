module.exports = (sequelize, DataTypes) => {
  const Facilitator = sequelize.define('Facilitator', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    qualification: DataTypes.STRING,
    location: DataTypes.STRING
  });

  Facilitator.associate = (models) => {
    Facilitator.belongsTo(models.Manager, { foreignKey: 'managerId' });
    Facilitator.hasMany(models.Allocation, { foreignKey: 'facilitatorId' });
  };

  return Facilitator;
};
