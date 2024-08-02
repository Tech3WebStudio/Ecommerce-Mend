const { Router } = require("express");
const sheetsRouter = Router();
const {
  authorize,
  getSheetData,
  appendRow,
  updateRow,
  deleteRow,
  registerSale,
  getSaleData,
  getSaleDataUnitiInfo,
} = require("../Controllers/sheets/sheetsController.js");
const uploadToS3 = require("../Controllers/sheets/uploadImages.js");

sheetsRouter.get("/data", async (req, res) => {
  try {
    const auth = await authorize();
    const data = await getSheetData(auth);
    // console.log();
    res.json(data.rows);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send(error.message);
  }
});

sheetsRouter.post("/data", async (req, res) => {
  try {
    const auth = await authorize();
    const data = req.body
    const updates = await appendRow(auth, data);
    res.json(updates);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

sheetsRouter.put("/update", async (req, res) => {
  try {
    const auth = await authorize();
    const rowData = req.body;
    const result = await updateRow(auth, rowData);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

sheetsRouter.delete("/delete/:rowIndex", async (req, res) => {
  try {
    const auth = await authorize();
    const rowIndex = parseInt(req.params.rowIndex, 10);
    const result = await deleteRow(auth, rowIndex);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

sheetsRouter.post("/images", (req, res) => {
  uploadToS3(req, res);
});

sheetsRouter.get("/sale/:id", async (req, res) => {
  try {
    const auth = await authorize();
    const saleId = req.params.id;
    const sales = await getSaleDataUnitiInfo(auth, saleId);
    
    if (sales.length === 0) {
      return res.status(404).json({ message: "Ventas no encontradas" });
    }
    
    res.json(sales);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(error.message);
  }
});


sheetsRouter.get("/sale", async (req, res) => {
  try {
    const auth = await authorize();
    const sale = await getSaleData(auth);
    res.json(sale.salesData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

sheetsRouter.post("/sale", async (req, res) => {
  try {
    const auth = await authorize();
    const sale = await registerSale(auth, req.body);
    res.json(sale);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = sheetsRouter;
