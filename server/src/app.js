const express = require("express");
const morgan = require("morgan");
const path = require('path');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./Routes/indexRoutes");
const invalidRoute = require("./Middleware/invalidRoute");
require('dotenv').config(); // Configuración de entorno

const server = express();

server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: [
      "https://ecommerce-mend.onrender.com",
      "http://localhost:5173"
    ],
    credentials: true,
  })
);

// Rutas API y middleware
server.use('/api', router); // Montar el router

// Servir archivos estáticos del frontend
server.use(express.static(path.join(__dirname, 'build')));

// Middleware para rutas no válidas
server.use(invalidRoute);

// Manejo de todas las demás rutas para el frontend
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = server;
