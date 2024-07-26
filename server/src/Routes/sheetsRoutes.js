const { Router } = require("express");
const sheetsRouter = Router();
const {
  authorize,
  getSheetData,
  appendRow,
  updateRow,
  deleteRow,
} = require("../Controllers/sheets/sheetsController.js");
const uploadToS3 = require("../Controllers/sheets/uploadImages.js");// Importa el middleware
const { authenticateToken } = require("../Middleware/authMiddleware.js");

// Rutas protegidas con authenticateToken
sheetsRouter.get("/data", authenticateToken, async (req, res) => {
  try {
    const auth = await authorize();
    const data = await getSheetData(auth);
    res.json(data.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

sheetsRouter.post("/data", authenticateToken, async (req, res) => {
  try {
    const auth = await authorize();
    const updates = await appendRow(auth, req.body);
    res.json(updates);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

sheetsRouter.put("/update", authenticateToken, async (req, res) => {
  try {
    const auth = await authorize();
    const rowData = req.body; // Asegúrate de que los datos de la fila están en el cuerpo de la solicitud
    const result = await updateRow(auth, rowData);
    console.log(rowData);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

sheetsRouter.delete("/delete/:rowIndex", authenticateToken, async (req, res) => {
  try {
    const auth = await authorize();
    const rowIndex = parseInt(req.params.rowIndex, 10);
    const result = await deleteRow(auth, rowIndex);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para subir imágenes sin protección (ajusta según sea necesario)
sheetsRouter.post("/images", (req, res) => {
  uploadToS3(req, res);
});

module.exports = sheetsRouter;
