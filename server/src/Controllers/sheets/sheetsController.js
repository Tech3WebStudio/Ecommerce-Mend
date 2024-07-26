require('dotenv').config();
const { google } = require("googleapis");


async function authorize() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URIS // Agrega esta variable a tu .env
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    // Obtener un nuevo token de acceso
    const { token } = await oauth2Client.getAccessToken();
    oauth2Client.setCredentials({ access_token: token });

    return oauth2Client;
  } catch (err) {
    console.error('Error en la autorización:', err);
    throw err;
  }
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
