const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./Routes/indexRoutes");
const invalidRoute = require("./Middleware/invalidRoute");
require('dotenv').config(); // Mueve esto aquí para que todas las configuraciones de entorno estén en un lugar

const server = express();

server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: [
        "http://localhost:5173",
    ],
    credentials: true,
  })
);
server.use(router); // Aquí se monta el router
server.use(invalidRoute);

const path = require('path');
const publicPath = path.join(__dirname, '..', 'client', 'build');
server.use(express.static(publicPath));

// Maneja todas las rutas para SPA
server.get('/*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = server;
