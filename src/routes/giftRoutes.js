const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');

// Ruta para obtener todos los regalos: GET /api/regalos
router.get('/regalos', giftController.getAllGifts);

// Ruta para crear un nuevo regalo: POST /api/regalos
router.post('/regalos', giftController.createGift);

module.exports = router;