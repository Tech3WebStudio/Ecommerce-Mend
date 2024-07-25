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

module.exports = server;
