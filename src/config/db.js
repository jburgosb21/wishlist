const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    // Esto es vital para Render + Neon
    rejectUnauthorized: false 
  }
});

module.exports = pool;