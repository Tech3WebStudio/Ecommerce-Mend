const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
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
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: 'Productos!A2:H', // Actualiza el rango para incluir la columna SKU
    });
    const rows = res.data.values || []; // Asegurarse de que rows sea un array
    let lastId = 0;
    if (rows.length > 0) {
        lastId = parseInt(rows[rows.length - 1][0]); // Asumiendo que la primera columna es el ID
    }
    return { rows, lastId };
}

function generateSKU(category, name, color, count) {
    const categoryInitial = category.charAt(0).toLowerCase();
    const nameInitial = name.charAt(0).toLowerCase();
    const colorInitial = color.charAt(0).toLowerCase();
    const skuNumber = String(count).padStart(4, '0'); // Pad the count with leading zeros to 4 digits
    return `${categoryInitial}-${nameInitial}-${colorInitial}-${skuNumber}`;
}

async function appendRow(auth, rowData) {
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Obtener el último ID y filas existentes
    const { rows, lastId } = await getSheetData(auth);
    const newId = lastId + 1;

    // Generar el SKU
    const [category, name, color, ...rest] = rowData; // Asumiendo que los datos siguen este orden
    const sku = generateSKU(category, name, color, newId);

    // Insertar la nueva fila con el ID incrementado y el SKU generado
    const newRow = [newId, category, name, color, ...rest, sku];
    const res = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: 'Productos!A2:H', // Actualiza el rango para incluir la columna SKU
        valueInputOption: 'RAW',
        resource: {
            values: [newRow],
        },
    });
    return res.data.updates;
}

async function updateRow(auth, rowData) {
    const sheets = google.sheets({ version: 'v4', auth });
    
    // Obtener todas las filas existentes
    const { rows } = await getSheetData(auth);
    
    // Encontrar el índice de la fila con el ID correspondiente
    const rowIndex = rows.findIndex(row => row[0] === rowData[0]);

    if (rowIndex === -1) {
        throw new Error('ID no encontrado');
    }

    // Actualizar los datos en la fila específica
    rows[rowIndex] = rowData;

    // Escribir los datos actualizados de vuelta en la hoja
    const res = await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.GOOGLE_SHEETS_ID,
        range: `Productos!A${rowIndex + 2}:H${rowIndex + 2}`, // Asumiendo que los datos comienzan en la fila 2
        valueInputOption: 'RAW',
        resource: {
            values: [rowData],
        },
    });

    return res.data;
}


async function deleteRow(auth, rowIndex) {
    const sheets = google.sheets({ version: 'v4', auth });
    
    const requests = [
        {
            deleteDimension: {
                range: {
                    sheetId: 0, // ID de la hoja, generalmente 0 para la primera hoja
                    dimension: 'ROWS',
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
    deleteRow
};
