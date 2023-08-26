const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "pg2418",
    host: "localhost",
    port: 5432,
    database: "project4"
  });

module.exports = pool;