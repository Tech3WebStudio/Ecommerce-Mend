require("dotenv").config();
const { Router } = require("express");
const loginRoutes = Router();
const { verifyToken, isAdmin } = require("../Middleware/authMiddleware");
const { authThird } = require("../Controllers/login/login");

loginRoutes.post("/third", async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);
    const decodedToken = await verifyToken(token);
    console.log(decodedToken);
    const email = decodedToken.email;
    console.log(email);

    const userData = await authThird(decodedToken);

    if (await isAdmin(email)) {
      res
        .status(200)
        .json({ message: "Authentication successful", theUser: userData });
    } else {
      res.status(403).json({ message: "User is not authorized" });
    }
  } catch (error) {
    console.log({ error: error.message });
    res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
});

module.exports = loginRoutes;
