require("dotenv").config();
const { google } = require("googleapis");

async function createUser(authClient, data) {
  try {
    const { uid, email, name, role } = data;
    const sheets = google.sheets({ version: "v4", auth: authClient });
    const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: `Vendedores!A1:E1`,
      valueInputOption: "RAW",
      resource: {
        values: [[uid, email, name, role, currentDate]],
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getUsers(authClient) {
  try {
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: `Vendedores!A2:E`,
    });

    const rows = response.data.values;

    const data = rows.map((row) => ({
      uid: row[0],
      email: row[1],
      nombre: row[2],
      rol: row[3],
      fecha: row[4],
    }));

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function isSeller(authClient, email) {
  try {
    const sellers = await getUsers(authClient);
    const userExist = sellers.find((seller) => seller.email === email);

    return userExist;
  } catch (error) {
    console.log(error);
  }
}

async function getUserByEmail(authClient, email) {
  try {
    const sellers = await getUsers(authClient);
    const sellerData = sellers.find((seller) => seller.email === email);

    if (!sellerData) {
      throw new Error('User not found');
    }

    return {
      uid: sellerData.uid,
      email: sellerData.email,
      nombre: sellerData.nombre,
      rol: sellerData.rol,
    };
  } catch (error) {
    console.log({ error: error.message });
    throw error;
  }
}
module.exports = { createUser, getUsers, isSeller, getUserByEmail };
