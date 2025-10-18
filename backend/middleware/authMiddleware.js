import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from "../models/userModel.js";

// Middleware : protéger les routes
const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt; 

  // Vérifie si le token est dans l'Authorization header
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  try {
    // Vérifie le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userId = decoded.userId;
    if (!userId) {
      return res.status(401).json({ message: "Invalid token structure!" });
    }

    const user = await User.findById(userId).select('_id name isAdmin');
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      isAdmin: user.isAdmin,
    };
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    
  }
});

// Middleware : vérifier que l'utilisateur est admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

export { protect, admin };