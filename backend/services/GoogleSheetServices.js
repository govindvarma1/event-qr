import { google } from "googleapis";
const sheets = google.sheets('v4');

const getAuth = async() => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "./google.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })
    const client = await auth.getClient();
    return client;
}

const getSpreadSheet = async ({ spreadsheetId, auth }) => {
    const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId,
        auth
    });
    return spreadsheet;
}

const getSpreadSheetValues = async({spreadsheetId, auth, range}) => {
    const spreadsheet = await sheets.spreadsheets.values.get({
        spreadsheetId,
        auth,
        range
    })
    return spreadsheet.data;
}

const updateSpreadSheetsValues = async ({ spreadsheetId, auth, range, data }) => {
    const res = await sheets.spreadsheets.values.update({
        spreadsheetId,
        auth,
        range,
        valueInputOption: "USER_ENTERED",
        resource: {
            values: data
        }
    });
    return res;
};

export {getAuth, getSpreadSheet, getSpreadSheetValues, updateSpreadSheetsValues};