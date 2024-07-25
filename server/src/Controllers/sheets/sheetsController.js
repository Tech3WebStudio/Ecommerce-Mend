require('dotenv').config();
const fs = require("fs").promises;
const path = require("path");
const { google } = require("googleapis");
const { authenticate } = require("@google-cloud/local-auth");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function saveCredentials(client) {
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
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
    console.log(error);
  }
}

function generateSKU(category, name, color, count) {
  const categoryInitial = category.charAt(0).toLowerCase();
  const nameInitial = name.charAt(0).toLowerCase();
  const colorInitial = color.charAt(0).toLowerCase();
  const skuNumber = String(count).padStart(4, "0");
  return `${categoryInitial}-${nameInitial}-${colorInitial}-${skuNumber}`;
}

async function appendRow(auth, rowData) {
  const sheets = google.sheets({ version: "v4", auth });
  const { rows, lastId } = await getSheetData(auth);
  const newId = lastId + 1;
  const { categoria, nombre, color, tamaño, cantidad, precio, url } = rowData;
  const sku = generateSKU(categoria, nombre, color, newId);
  const urlString = Array.isArray(url) ? url.join(', ') : url;
  const newRow = [newId, categoria, nombre, color, tamaño, cantidad, precio, urlString, sku];
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
  const urlString = Array.isArray(rowData.url) ? rowData.url.join(', ') : rowData.url;
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

module.exports = {
  authorize,
  getSheetData,
  appendRow,
  updateRow,
  deleteRow,
};
