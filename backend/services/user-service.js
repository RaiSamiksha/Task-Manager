const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { UserRepository } = require("../repositories/index");

const SECRET_KEY = "my_secret";

const signupUser = async (email, username, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const result = await UserRepository.createUser(email, username, hashedPassword, role);
  return result;
};

const signinUser = async (email, password) => {
  const user = await UserRepository.findUserByUsername(email);
  if(!user){
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid){
    throw new Error("Invalid password");
  }
  const token = jwt.sign({  email: user.email, id: user.id }, SECRET_KEY, { expiresIn: "1h" });
  return token;
};

module.exports = {
  signupUser,
  signinUser
};
