const { UserService } = require("../services/index");

// Signup
async function signupUser(req, res){
  try {
    const { username, password } = req.body;
    const user = await UserService.signupUser(username, password);
    return res.status(201).json({ message: "User signed up successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Signup failed", details: error.message });
  }
};

// Signin
async function signinUser(req, res){
  try {
    const { username, password } = req.body;
    const user = await UserService.signinUser(username, password);
    return res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials", details: error.message });
  }
};

module.exports ={
  signupUser,
  signinUser,
}
