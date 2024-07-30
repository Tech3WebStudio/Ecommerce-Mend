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
server.use(router); // Montar el router

// Middleware para rutas no válidas
server.use(invalidRoute);

module.exports = server;
