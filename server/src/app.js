const express = require("express");
const morgan = require("morgan");
const path = require('path');
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
        "https://ecommerce-mend.onrender.com"
    ],
    credentials: true,
  })
);
server.use(router); // Aquí se monta el router
server.use(invalidRoute);

server.use(express.static(path.join(__dirname, 'dist')));

server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = server;
