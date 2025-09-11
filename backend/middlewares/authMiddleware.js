import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  try {
    let token = req.cookies.jwt; 
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden!" });
      }
      
      req.user = decoded.userId;
      next();
    });

  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  } 
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message:'Not authorized as an admin' });
  }
};

export { protect, admin };