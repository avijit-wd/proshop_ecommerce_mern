import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    res.status(401);
    throw new Error("No authorization, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error(error);
    throw new Error("No authorization, token failed");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorize as an admin");
  }
};

export { protect, admin };
