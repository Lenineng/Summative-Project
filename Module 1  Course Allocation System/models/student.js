module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: DataTypes.STRING,
    name: DataTypes.STRING
  });

  Student.associate = (models) => {
    Student.belongsTo(models.Class, { foreignKey: 'classId' });
    Student.belongsTo(models.Cohort, { foreignKey: 'cohortId' });
  };

  return Student;
};
