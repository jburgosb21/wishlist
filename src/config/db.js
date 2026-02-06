const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Esto es fundamental para que Render no rechace la conexión a Neon
    rejectUnauthorized: false 
  }
});

module.exports = pool;