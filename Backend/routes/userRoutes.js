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
router.post('/register', registerUser); 
router.post('/login', loginUser);       


router.get('/', verifyToken, getUsers);  
router.get('/:id', verifyToken, getUserById);  
router.put('/:id', verifyToken, updateUser);  
router.delete('/:id', verifyToken, deleteUser); 

export default router;
