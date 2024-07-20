const { Router } = require("express");
const router = Router();

const sheetsRouter = require("./sheetsRoutes");

router.use("/api/sheets", sheetsRouter)

module.exports = router;