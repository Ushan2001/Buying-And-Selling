const User = require("../module/User.js");
const {
  hashPassword,
  verifyPassword,
  generateToken,
} = require("../helpers/auth-middleware.js");

const signUp = async (req, res) => {
  const { username , password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (error) {
    return console.log(error);
  }
  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const hashedPassword = hashPassword(password);
  const user = new User({
    username,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }

  return res
    .status(201)
    .json({ message: "User registered successfully!", username });
};

const signIn = async (req, res) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User not found!" });
  }

  const isPasswordCorrect = verifyPassword(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password!" });
  }

  const token = generateToken(existingUser.id, existingUser.username);

  return res.status(200).json({ message: "User logged successfully!", token });
};

module.exports = {
  signUp,
  signIn,
};
