// backend/db.js
const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "secret",
  database: "luct_reporting_database",
});

module.exports = pool;
