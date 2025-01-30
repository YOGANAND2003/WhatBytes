import express from 'express';
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register and Login routes
router.post('/register', registerUser);  // No token required for registration
router.post('/login', loginUser);        // No token required for login

// User CRUD operations (protected routes)
router.get('/', verifyToken, getUsers);  // Protected route
router.get('/:id', verifyToken, getUserById);  // Protected route
router.put('/:id', verifyToken, updateUser);   // Protected route
router.delete('/:id', verifyToken, deleteUser); // Protected route

export default router;
