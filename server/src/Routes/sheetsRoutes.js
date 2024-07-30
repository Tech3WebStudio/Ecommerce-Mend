const { Router } = require("express");
const sheetsRouter = Router();
const {
  authorize,
  getSheetData,
  appendRow,
  updateRow,
  deleteRow,
} = require("../Controllers/sheets/sheetsController.js");
const uploadToS3 = require("../Controllers/sheets/uploadImages.js");

sheetsRouter.get("/data", async (req, res) => {
  try {
    const auth = await authorize();
    // console.log(auth);
    const data = await getSheetData(auth);
    res.json(data.rows);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).send(error.message);
  }
});

sheetsRouter.post("/data", async (req, res) => {
  try {
    const auth = await authorize();
    const updates = await appendRow(auth, req.body);
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

module.exports = sheetsRouter;
