const express = require('express');
const cors = require('cors');
const giftRoutes = require('./routes/giftRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares
app.use(cors());
app.use(express.json());

// 2. Servir archivos estáticos de la carpeta 'public'
app.use(express.static('public'));

// 3. Rutas de la API
app.use('/api', giftRoutes);

// 4. Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});