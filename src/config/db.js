const { Pool } = require('pg');
require('dotenv').config();

// El Pool gestiona múltiples conexiones para que sea más rápido
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Requerido para Neon/Render
});

module.exports = pool;