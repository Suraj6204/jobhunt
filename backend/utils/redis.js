import { Redis } from 'ioredis';

// JobHunt Project - redis connection file
const redis = new Redis({
  port: 6379,
  host: "127.0.0.1",
  keyPrefix: "jobhunt:", // Ye zaroori hai
});

redis.on('connect', () => {
    console.log('Redis connected successfully! 🚀');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

export default redis;