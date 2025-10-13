// middlewares/auth-middleware.js
const jwt = require("jsonwebtoken");

const SECRET_KEY = "my_secret";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    req.user = decoded; // attach user info to request
    next();
  });
};

module.exports = {
  verifyToken,
}
