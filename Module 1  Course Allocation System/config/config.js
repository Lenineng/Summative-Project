require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || "Course_Management_Platform",
    password: process.env.DB_PASSWORD || "son of God1234567",
    database: process.env.DB_NAME || "course_allocation_db",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql"
  }
};
