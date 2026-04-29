const { Queue } = require('bullmq');
const Redis = require('ioredis');

// Build the Redis connection with retry limits so a missing Redis server
// only logs a warning instead of flooding the console indefinitely.
const connection = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  maxRetriesPerRequest: null, // Required by BullMQ
  retryStrategy(times) {
    if (times > 10) {
      console.error('[Redis] Could not connect after 10 attempts – task queuing will be unavailable.');
      return null; // stop retrying
    }
    return Math.min(times * 200, 3000); // exponential back-off, max 3s
  },
  reconnectOnError() {
    return false;
  },
});

// Prevent unhandled-rejection crashes when Redis is unavailable
connection.on('error', (err) => {
  if (err.code === 'ECONNREFUSED') {
    // Already handled by retryStrategy – suppress repeated logs
  } else {
    console.error('[Redis] Unexpected error:', err.message);
  }
});

const taskQueue = new Queue('task-queue', { connection });

// Suppress BullMQ's own unhandled-rejection on queue when Redis is down
taskQueue.on('error', (err) => {
  console.warn('[TaskQueue] Queue error (Redis may be unavailable):', err.message);
});

const addJob = async (taskId) => {
  await taskQueue.add('process-task', { taskId: taskId.toString() });
};

module.exports = {
  taskQueue,
  addJob,
};
