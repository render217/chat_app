const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.send({ message: "All fields are required" });
  }
  const userExist = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (userExist) {
    return res.send({ msg: "user already exist" });
  }
  const hashPassword = bcrypt.hashSync(password, 10);
  const newUser = await User.create({
    username,
    email,
    password: hashPassword,
  });
  console.log("user created", newUser);
  res.json({ message: "successfully created user" });
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ message: "All fields are required" });
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.send({
      message: "Invalid email or password. aka(no user found)",
    });
  }

  const passwordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!passwordCorrect) {
    return res.send({
      message: "Invalid email or password. aka(password incorrect)",
    });
  }
  const payload = {
    id: existingUser._id,
  };
  existingUser.password = undefined;
  const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET);
  res.send({ user: existingUser, token });
};
exports.allUser = (req, res) => {};
