
const mysql = require("mysql2"); 

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST || "db4free.net",  
  user: process.env.DB_USER || "kabelo",       
  password: process.env.DB_PASSWORD || "mysecret",
  database: process.env.DB_NAME || "luctreporing",  
  port: process.env.DB_PORT || 3306,
  ssl: {
    rejectUnauthorized: false, 
  },
});

module.exports = pool.promise(); 
