
const {Client} = require('pg')
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = require('./config')

module.exports.client = new Client({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME
})
