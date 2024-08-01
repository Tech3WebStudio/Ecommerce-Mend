const server = require("./src/app"); // Requiere el archivo de configuración
// const express = require("express");
// const path = require("path");
const PORT = process.env.PORT || 3000;



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
