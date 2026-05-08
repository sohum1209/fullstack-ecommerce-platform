require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  try {
    console.log("Authorization header:", req.headers.authorization); // Debug log
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token:", decoded); // Debug log

    // Get user from token
    const user = await User.findById(decoded.id).select("-password");
    console.log("Found user:", user ? user._id : "null"); // Debug log

    if (!user) {
      return res.status(401).json({ error: "Not authorized, user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Token verification error:", error.message); // Debug log
    res.status(401).json({ error: "Not authorized, token failed" });
  }
};

module.exports = protect;