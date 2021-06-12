const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    RPC_USER: process.env.RPC_USER,
    RPC_PASSWORD: process.env.RPC_PASSWORD,
    RPC_HOST: process.env.RPC_HOST,
    RPC_PORT: process.env.RPC_PORT
}