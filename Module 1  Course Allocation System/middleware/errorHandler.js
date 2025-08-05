// middleware/errorHandler.js

function errorHandler(err, req, res, next) {
  console.error('🔥 Error:', err); // logs full error on server

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? '🥷 Hidden' : err.stack
  });
}

module.exports = errorHandler;
