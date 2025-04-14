require('dotenv').config();
const mysql = require('mysql2');
const url = require('url');

const dbUrl = new URL(process.env.DATABASE_URL)

const db = mysql.createConnection({
    host: dbUrl.hostname,
    port: dbUrl.port,
    user: dbUrl.username,
    password: dbUrl.password,
    database: 'railway',
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = db;
