module.exports = (sequelize, DataTypes) => {
  const Cohort = sequelize.define('Cohort', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING
  });

  Cohort.associate = (models) => {
    Cohort.hasMany(models.Student, { foreignKey: 'cohortId' });
  };

  return Cohort;
};
