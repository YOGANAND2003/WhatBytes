import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to verify token
export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};
