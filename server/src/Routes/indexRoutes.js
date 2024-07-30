const { Router } = require("express");
const router = Router();

const sheetsRouter = require("./sheetsRoutes");
const loginRoutes = require("./loginRoutes");

router.use("/api/sheets", sheetsRouter);
router.use("/api/login", loginRoutes);

module.exports = router;
