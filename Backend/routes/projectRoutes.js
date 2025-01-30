import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createProject, getProjects, updateProject, deleteProject } from '../controllers/projectController.js';

const router = express.Router();

router.post('/', verifyToken, createProject);
router.get('/', verifyToken, getProjects);
router.put('/:id', verifyToken, updateProject);
router.delete('/:id', verifyToken, deleteProject);

export default router;
