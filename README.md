# Course-Management-Platform

A full-stack platform designed to manage course offerings and track facilitator activity logs.
Includes Redis-backed notifications, RESTful APIs, authentication with role-based access, and background workers for alerting.

## NOTE: 
MODULE 1&2 ARE IN SAME FOLDER "Module 1  Course Allocation System" 

## Demo Video
🔗 https://www.loom.com/share/edc71e0d1eb447908cd0abaa567cde2e?sid=fd8e64fd-4a33-4cfd-a676-3f84abbbbe67

## Swagger Documentation
🔗  http://localhost:3000/api-docs/

## Module 3 Student Reflection Page 
🔗 http://127.0.0.1:5500/Module%203%20Student%20Reflection/index.html

###Table of Contents

  -Features

  - Prerequisites

  -  Installation

  -   Environment Setup

  -  Database Schema

  -   Authentication

  -  Running the App

  -  Redis & Worker Setup

  -  API Testing

  -  Project Structure

  -  Use Cases

  -  Troubleshooting

  -  Limitations

  -  License

  -   Author

### Features

   -Facilitator activity tracking (attendance, grading, moderation, etc.)

   -Course offering management

   -JWT-based authentication and role authorization

   -Redis-backed notification queue (reminders and alerts)

   -Background worker system

   -RESTful API with Swagger documentation

   -Sequelize ORM for MySQL database

   -Email simulation for notification delivery

#### Prerequisites

   -Node.js 

   -MySQL

   -Redis

   -npm

   -Git (optional)

#### Installation
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
```

#### Environment Setup

Create a .env file and configure your environment:

```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=activitylogs
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret
```
#### Database Schema

Key tables:

   -Users: Facilitators and managers

   -Roles: User roles

   -CourseOfferings: Course instances

   -ActivityLogs: Weekly submissions

   -Notifications: Sent messages

   -SequelizeMeta: Migration tracking

   -Use Sequelize migrations to create tables:

   -npx sequelize-cli db:migrate

#### Authentication

   -JWT tokens used to protect routes

   -Roles checked with middleware (authorizeRole)

   -Login returns a JWT to be used in headers

Login Sample:
```bash
POST /auth/login
{
  "email": "manager@example.com",
  "password": "password"
}
```
#### Running the App
Start the API server
```bash
npm start
```
# or
```bash
node server.js
```
Start the notification worker
```bash
node workers/notificationWorker.js
```


### API Testing

Use Postman or Swagger UI to test endpoints.
Example: Create Activity Log
```bash
POST /api/activitytracker
Authorization: Bearer <token>

{
  "allocationId": "uuid",
  "weekNumber": 5,
  "attendance": [true, false, true],
  "formativeOneGrading": "Pending",
  "courseModeration": "Done"
}
```
   ## Full list of endpoints at:
   ```bash
    http://localhost:5000/api-docs
```
#### Project Structure
 ```bash
Summative-Project/
│
├── Module 1  Course Allocation System/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── swagger.js
│   ├── seed.js
│   ├── models/
│   │   ├── index.js
│   │   ├── manager.js
│   │   ├── facilitator.js
│   │   ├── student.js
│   │   ├── class.js
│   │   ├── cohort.js
│   │   ├── module.js
│   │   ├── mode.js
│   │   ├── allocation.js
│   │   └── activityLog.js
│   ├── controllers/
│   │   ├── managerController.js
│   │   ├── facilitatorController.js
│   │   ├── studentController.js
│   │   ├── classController.js
│   │   ├── cohortController.js
│   │   ├── moduleController.js
│   │   ├── modeController.js
│   │   ├── allocationController.js
│   │   └── activityLogController.js
│   ├── routes/
│   │   ├── manager.js
│   │   ├── facilitator.js
│   │   ├── student.js
│   │   ├── class.js
│   │   ├── cohort.js
│   │   ├── module.js
│   │   ├── mode.js
│   │   ├── allocation.js
│   │   └── activityLog.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── config.js
│   └── README.md
│
├── Module 3 Student Reflection/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   ├── translations.js
│   └── README.md
└── README.md
 ```

### License

MIT License

