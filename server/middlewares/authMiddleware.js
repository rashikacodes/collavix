const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find actual user
    const user = await User.findById(decoded.id)
      .select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User no longer exists",
      });
    }

    // Attach user to request
    req.user = user;

    // Continue to next function
    next();

  } catch (err) {
    return res.status(401).json({
      message: "Not authorized, token invalid",
    });
  }
};

module.exports = { protect };

exports.getProfile = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};