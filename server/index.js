const server = require("./src/app"); 
const PORT = process.env.PORT || 3000;

<<<<<<< HEAD
=======
// Sirve los archivos estáticos de la carpeta client/build
server.use(express.static(path.join(__dirname, "../client/build")));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
>>>>>>> 7a60427 (Update index.js)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
