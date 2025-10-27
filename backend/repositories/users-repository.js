// src/repository/user-repository.js
const { Users } = require("../models");

const createUser = async (email, username, passwordHash, role) => {
  return await Users.create({ email, username, password: passwordHash, role });
};

const findUserByUsername = async (email) => {
  return await Users.findOne({ where: { email } });
};

module.exports = { 
    createUser,
    findUserByUsername
 };
