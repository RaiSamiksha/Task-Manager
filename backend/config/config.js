import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "secret",
    name: process.env.DB_NAME || "eventdb",
  },
};

export default config;
