const express = require('express');
const cors = require('cors');
const giftRoutes = require('./routes/giftRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Permite leer JSON en las peticiones

// Rutas
app.use('/api', giftRoutes);

app.get('/', (req, res) => {
  res.send('API de Wishlist para el Ing. Andrés funcionando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});