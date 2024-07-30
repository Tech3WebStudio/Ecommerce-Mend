const server = require("./src/app"); // Requiere el archivo de configuración
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;

// Sirve los archivos estáticos de la carpeta client/build
server.use(express.static(path.join(__dirname, "../client/build")));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
