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

    const products = rows.map(row => ({
      id: row[0],
      categoria: row[1],
      nombre: row[2],
      color: row[3],
      talle: row[4],
      cantidad: row[5],
      precio: row[6],
      url: row[7],
      sku: row[8],
    }));

    return { products, lastId };
  } catch (error) {
    console.log({ error: error.message });
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
  
  // Obtener los datos actuales de la hoja
  const { products } = await getSheetData(auth);

  // Buscar el índice de la fila correspondiente usando el ID
  const rowIndex = products.findIndex((product) => product.id === rowData.id);

  // Lanzar un error si el ID no se encuentra
  if (rowIndex === -1) {
    throw new Error("ID no encontrado");
  }

  // Convertir el array de URLs en una cadena, si es necesario
  const urlString = Array.isArray(rowData.url) ? rowData.url.join(", ") : rowData.url;

  // Construir la fila actualizada con los datos de rowData
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

  // Actualizar la fila en la hoja de cálculo
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

async function registerSale(auth, data) {
  try {
    const { productos, nombreCliente, formaPago } = data;

    const sheets = google.sheets({ version: "v4", auth });

    // Obtener la última fila para determinar el ID más reciente
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A:A", // Ajusta esto si tu ID no está en la columna A
    });

    const rows = response.data.values;
    let lastId = 0;

    if (rows && rows.length > 1) {
      lastId = rows.length - 1; 
    }

    const newId = lastId + 1;


    const currentDate = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const ventaData = productos.map((prod) => [
      newId,
      prod.id,
      nombreCliente,
      prod.sku,
      prod.cantidad,
      prod.talle,
      prod.color,
      prod.precio,
      formaPago,
      prod.cantidad * prod.precio,
      currentDate
    ]);

    // Append the data to the spreadsheet
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:I", 
      valueInputOption: "RAW",
      resource: {
        values: ventaData,
      },
    });

    return { message: "Venta registrada exitosamente", data: res.data };
  } catch (error) {
    console.error('Error registrando la venta:', error);
    throw new Error('Error registrando la venta');
  }
}

async function getSaleDataUnitiInfo(auth, id) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:K",
    });
    const rows = res.data.values || [];
    
    // Filtrar las ventas con el id correspondiente y mapear a objetos
    const sales = rows
      .filter(row => row[0] === id.toString())
      .map(row => ({
        id: row[0],
        idProducto: row[1],
        cliente: row[2],
        sku: row[3],
        cantidad: row[4],
        talle: row[5],
        color: row[6],
        subtotal: row[7],
        pago: row[8],
        total: row[9],
        fecha: row[10]
      }));

    return sales;
  } catch (error) {
    console.log({ error: error.message });
    throw error;
  }
}

async function getSaleData(auth) {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: "Ventas!A2:K",
    });
    const rows = res.data.values || [];
    let lastId = 0;
    if (rows.length > 0) {
      lastId = parseInt(rows[rows.length - 1][0]);
    }

    const salesMap = {};

    rows.forEach(row => {
      const id = row[0];
      if (!salesMap[id]) {
        salesMap[id] = {
          id: row[0],
          idProducto: row[1],
          cliente: row[2],
          sku: row[3],
          cantidad: parseInt(row[4]),
          talle: row[5],
          color: row[6],
          subtotal: parseFloat(row[7]),
          pago: row[8],
          total: parseFloat(row[9]),
          fecha: row[10]
        };
      } else {
        salesMap[id].cantidad += parseInt(row[4]);
        salesMap[id].subtotal += parseFloat(row[7]);
        salesMap[id].total += parseFloat(row[9]);
      }
    });

    const salesData = Object.values(salesMap);

    return { salesData, lastId };
  } catch (error) {
    console.log({ error: error.message });
  }
}

module.exports = {
  authorize,
  getSheetData,
  appendRow,
  updateRow,
  deleteRow,
  registerSale,
  getSaleData,
  getSaleDataUnitiInfo
};
