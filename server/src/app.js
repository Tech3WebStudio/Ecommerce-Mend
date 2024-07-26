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
      "http://localhost:5173",
      "https://ecommerce-mend.onrender.com"
    ],
    credentials: true,
  })
);

// Rutas API y middleware
server.use(router); // Montar el router

// Archivos estáticos
server.use(express.static(path.join(__dirname, 'build'))); // Asegúrate de que el directorio 'build' es el correcto

// Servir index.html para todas las demás rutas
server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html')); // Asegúrate de que 'index.html' está en 'build'
});

// Middleware para rutas no válidas
server.use(invalidRoute);

module.exports = server;
