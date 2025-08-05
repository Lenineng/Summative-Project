// services/notificationService.js
const Redis = require('ioredis');
const redis = new Redis();

const QUEUE_KEY = 'notifications';

const addNotificationToQueue = async (notification) => {
  await redis.lpush(QUEUE_KEY, JSON.stringify(notification));
};

const getNotificationFromQueue = async () => {
  const data = await redis.rpop(QUEUE_KEY);
  return data ? JSON.parse(data) : null;
};

module.exports = {
  addNotificationToQueue,
  getNotificationFromQueue
};
