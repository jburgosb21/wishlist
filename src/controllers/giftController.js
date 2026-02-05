const pool = require('../config/db');

// Obtener todos los regalos
const getAllGifts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM regalos ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener regalos" });
  }
};

// Crear un nuevo regalo
const createGift = async (req, res) => {
  const { nombre, link, precio, user_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO regalos (nombre, link, precio, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, link, precio, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al guardar el regalo" });
  }
};

module.exports = { getAllGifts, createGift };