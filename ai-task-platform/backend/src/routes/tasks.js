const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');
const { addJob } = require('../queue/taskQueue');

const router = express.Router();

// All routes use auth middleware
router.use(auth);

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, inputText, operation } = req.body;

    if (!title || !inputText || !operation) {
      return res.status(400).json({ message: 'title, inputText, and operation are required' });
    }

    const task = new Task({
      userId: req.user._id,
      title,
      inputText,
      operation,
      status: 'pending',
    });

    await task.save();

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access to task' });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/run', async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access to task' });
    }

    task.status = 'pending';
    task.logs.push({ message: 'Task queued for execution' });
    await task.save();

    await addJob(task._id);

    res.json({ message: 'Task successfully queued for execution' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
