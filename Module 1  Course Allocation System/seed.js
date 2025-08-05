const db = require('./models');

const seed = async () => {
  await db.sequelize.sync({ force: true });

  // Create Modes
  const [online, inPerson, hybrid] = await Promise.all([
    db.Mode.create({ type: 'Online' }),
    db.Mode.create({ type: 'In-person' }),
    db.Mode.create({ type: 'Hybrid' })
  ]);

  // Create a manager and facilitator
  const [manager, facilitator] = await Promise.all([
    db.User.create({ name: 'Alice Manager', email: 'manager@example.com', role: 'manager' }),
    db.User.create({ name: 'Bob Facilitator', email: 'facilitator@example.com', role: 'facilitator' })
  ]);

  // Create modules
  const module1 = await db.Module.create({ title: 'Web Development', code: 'WD101' });

  // Create cohort & class
  const cohort = await db.Cohort.create({ name: '2025A' });
  const classEntry = await db.Class.create({ name: '2025J' });

  // Create one course offering
  await db.CourseOffering.create({
    trimester: 'T1',
    intake: 'HT1',
    moduleId: module1.id,
    facilitatorId: facilitator.id,
    cohortId: cohort.id,
    classId: classEntry.id,
    modeId: online.id
  });

  console.log('✅ Seeding done!');
  process.exit();
};

seed();
