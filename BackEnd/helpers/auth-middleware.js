const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hashSync(password);
};

const verifyPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

const generateToken = (userId, username) => {
  return jwt.sign({ userId, username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const verifyToken = (req, res, next) => {
  const [bearer, tokenWithPrefix] = req.headers.authorization.split(" ");

  if (bearer !== "Bearer" || !tokenWithPrefix) {
    return res
      .status(403)
      .json({ message: "Invalid authorization header format!" });
  }

  const token = tokenWithPrefix.substring(tokenWithPrefix.indexOf("=") + 1);

  if (!token) {
    return res.status(403).json({ message: "Token is required!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token!", err });
    }
    req.userData = decoded;
    next();
  });
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
};
