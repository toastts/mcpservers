require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

pool.query('SELECT NOW()', (err: any, res: { rows: any; }) => {
  if (err) {
    console.error("Connection error:", err);
  } else {
    console.log("Connection successful:", res.rows);
  }
  pool.end();
});
