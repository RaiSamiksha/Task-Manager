const { UserService } = require("../services/index");

// Signup
async function signupUser(req, res){
  try {
    const { email, username, password, role } = req.body;
    const user = await UserService.signupUser(email, username, password, role);
    return res.status(201).json({ message: "User signed up successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Signup failed", details: error.message });
  }
};

// Signin
async function signinUser(req, res){
  try {
    const { email, password } = req.body;
    const user = await UserService.signinUser(email, password);
    return res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials", details: error.message });
  }
};

module.exports ={
  signupUser,
  signinUser,
}
