module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    half: DataTypes.STRING 
  });

  Module.associate = (models) => {
    Module.hasMany(models.Allocation, { foreignKey: 'moduleId' });
  };

  return Module;
};
