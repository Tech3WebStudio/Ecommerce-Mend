require("dotenv").config();
const { google } = require("googleapis");
// const path = require("path");

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      type: "service_account",
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const authClient = await auth.getClient();
  return authClient;
}

async function getSheetData(auth) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Productos!A2:I",
    });
    const rows = res.data.values || [];
    let lastId = 0;
    if (rows.length > 0) {
      lastId = parseInt(rows[rows.length - 1][0]);
    }
    return { rows, lastId };
  } catch (error) {
    console.log({ error: error.message });
  }
}

async function appendRow(auth, rowData) {
  const sheets = google.sheets({ version: "v4", auth });
  const { rows, lastId } = await getSheetData(auth);
  const newId = lastId + 1;
  const { categoria, nombre, color, tamaño, cantidad, precio, url } = rowData;
  const sku = generateSKU(categoria, nombre, color, newId);
  const urlString = Array.isArray(url) ? url.join(", ") : url;
  const newRow = [
    newId,
    categoria,
    nombre,
    color,
    tamaño,
    cantidad,
    precio,
    urlString,
    sku,
  ];
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Productos!A2:I",
    valueInputOption: "RAW",
    resource: {
      values: [newRow],
    },
  });
  return res.data.updates;
}

async function updateRow(auth, rowData) {
  const sheets = google.sheets({ version: "v4", auth });
  const { rows } = await getSheetData(auth);
  const rowIndex = rows.findIndex((row) => row[0] === rowData.id);
  if (rowIndex === -1) {
    throw new Error("ID no encontrado");
  }
  const urlString = Array.isArray(rowData.url)
    ? rowData.url.join(", ")
    : rowData.url;
  const updatedRow = [
    rowData.id,
    rowData.categoria,
    rowData.nombre,
    rowData.color,
    rowData.tamaño,
    rowData.cantidad,
    rowData.precio,
    urlString,
    rowData.sku,
  ];
  rows[rowIndex] = updatedRow;
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `Productos!A${rowIndex + 2}:I${rowIndex + 2}`,
    valueInputOption: "RAW",
    resource: {
      values: [updatedRow],
    },
  });
  return res.data;
}

async function deleteRow(auth, rowIndex) {
  const sheets = google.sheets({ version: "v4", auth });
  const requests = [
    {
      deleteDimension: {
        range: {
          sheetId: 0,
          dimension: "ROWS",
          startIndex: rowIndex,
          endIndex: rowIndex + 1,
        },
      },
    },
  ];
  const res = await sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    resource: {
      requests,
    },
  });
  return res.data;
}

async function increaseStock(auth, productId, amount) {
  const sheets = google.sheets({ version: "v4", auth });
  const { rows } = await getSheetData(auth);
  const rowIndex = rows.findIndex((row) => row[0] === productId);
  if (rowIndex === -1) {
    throw new Error("ID no encontrado");
  }
  rows[rowIndex][5] = parseInt(rows[rowIndex][5]) + amount; // Suponiendo que la columna 5 es la cantidad en stock
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `Productos!A${rowIndex + 2}:I${rowIndex + 2}`,
    valueInputOption: "RAW",
    resource: {
      values: [rows[rowIndex]],
    },
  });
  return res.data;
}

async function decreaseStock(auth, productId, amount) {
  const sheets = google.sheets({ version: "v4", auth });
  const { rows } = await getSheetData(auth);
  const rowIndex = rows.findIndex((row) => row[0] === productId);
  if (rowIndex === -1) {
    throw new Error("ID no encontrado");
  }
  rows[rowIndex][5] = parseInt(rows[rowIndex][5]) - amount; // Suponiendo que la columna 5 es la cantidad en stock
  const res = await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: `Productos!A${rowIndex + 2}:I${rowIndex + 2}`,
    valueInputOption: "RAW",
    resource: {
      values: [rows[rowIndex]],
    },
  });
  return res.data;
}

module.exports = {
  authorize,
  getSheetData,
  appendRow,
  updateRow,
  deleteRow,
  increaseStock,
  decreaseStock
};
