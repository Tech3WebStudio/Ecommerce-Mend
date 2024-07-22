const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function verifyToken(token) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Token verification failed");
  }
}

async function isAdmin(email) {
  const adminEmails = ["niveyrojulian5@gmail.com"]; // Reemplaza con los correos electrónicos de los administradores
  return adminEmails.includes(email);
}

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await verifyToken(token);
    const email = decodedToken.email;

    if (await isAdmin(email)) {
      req.user = decodedToken;
      next();
    } else {
      return res.status(403).json({ message: "User is not authorized" });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  authMiddleware,
  verifyToken,
  isAdmin,
};
