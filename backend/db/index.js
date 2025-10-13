// src/db/index.js
const { Sequelize } = require("sequelize");
const { db } = require("../../config/config"); // <-- import here

const sequelize = new Sequelize(db.name, db.user, db.password, {
  host: db.host,
  dialect: db.dialect,
  logging: db.logging,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};

module.exports = { sequelize, connectDB };
