module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    graduationDate: DataTypes.DATE
  });

  Class.associate = (models) => {
    Class.hasMany(models.Student, { foreignKey: 'classId' });
    Class.hasMany(models.Allocation, { foreignKey: 'classId' });
  };

  return Class;
};
