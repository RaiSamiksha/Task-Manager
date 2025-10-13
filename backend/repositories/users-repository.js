// src/repository/user-repository.js
const User = require("../models/users");

const createUser = async (username, passwordHash) => {
  return await User.create({ username, password: passwordHash });
};

const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

module.exports = { 
    createUser,
    findUserByUsername
 };
