const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./Routes/indexRoutes");
const invalidRoute = require("./Middleware/invalidRoute");
require("dotenv").config(); // Configuración de entorno

const server = express();

server.name = "API";
server.use(morgan("dev"));
server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: ["https://ecommerce-mend.onrender.com", "http://localhost:5173"],
    credentials: true,
  })
);

// Rutas API y middleware
server.use("/api", router); // Montar el router

// Sirve los archivos estáticos de la carpeta client/build
server.use(express.static(path.join(__dirname, "../../client/dist")));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "/dashboard"));
});
// Middleware para rutas no válidas de la API
server.use("/api/*", invalidRoute);

module.exports = server;
