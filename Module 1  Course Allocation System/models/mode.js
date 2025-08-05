module.exports = (sequelize, DataTypes) => {
  const Mode = sequelize.define('Mode', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING
  });

  Mode.associate = (models) => {
    Mode.hasMany(models.Allocation, { foreignKey: 'modeId' });
  };

  return Mode;
};
