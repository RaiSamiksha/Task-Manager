const jwt = require("jsonwebtoken");
const { UserRepository } = require("../repositories/index");

const SECRET_KEY = "my_secret";

const signupUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const result = await UserRepository.createUser(username, hashedPassword);
  return result;
};

const signinUser = async (username, password) => {
  const user = await UserRepository.findUserByUsername(username);
  if(!user){
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid){
    throw new Error("Invalid password");
  }
  const token = jwt.sign({  username: user.username, id: user.id }, SECRET_KEY, { expiresIn: "1h" });
  return token;
};

module.exports = {
  signupUser,
  signinUser
};
