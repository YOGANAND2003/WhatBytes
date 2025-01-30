import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createTask, getTasks, updateTask, deleteTask, filterTasks } from '../controllers/taskController.js';

const router = express.Router();

router.post('/projects/:projectId/tasks', verifyToken, createTask);
router.get('/projects/:projectId/tasks', verifyToken, getTasks);
router.put('/tasks/:id', verifyToken, updateTask);
router.delete('/tasks/:id', verifyToken, deleteTask);
router.get('/tasks', verifyToken, filterTasks);

export default router;
