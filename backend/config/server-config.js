const dotenv = require('dotenv');

const env = process.env.APP_ENV || "test";
dotenv.config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const secretKey = process.env.SECRET_KEY;

module.exports = {
    port,
    host,
    env,
    secretKey,
}