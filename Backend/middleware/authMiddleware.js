import jwt from "jsonwebtoken";
import User from "../models/user.js";
import mongoose from "mongoose";

export const protect = async (req, res, next) => {
  try {
    // Read token from cookie or Authorization header
    let token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
   
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Check if it's a mock token (for development with mock auth)
    if (token.startsWith('mock-token-')) {
      // Create a mock user for development
      req.user = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Mock User',
        email: 'mock@example.com',
        preferences: {
          learningStyle: 'project-based',
          freeOnly: false,
          certificationRequired: false
        }
      };
      return next();
    }

    // Verify real JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from DB
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
