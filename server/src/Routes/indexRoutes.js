const { Router } = require("express");
const router = Router();

const sheetsRouter = require("./sheetsRoutes");
const loginRoutes = require("./loginRoutes");

router.use("/sheets", sheetsRouter);
router.use("/login", loginRoutes);

module.exports = router;
