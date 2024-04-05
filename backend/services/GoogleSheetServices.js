import { google } from "googleapis";
const sheets = google.sheets("v4");

const getAuth = async() => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "./google.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })
    const client = await auth.getClient();
    return client;
}

const getSpreadSheet = async({spreadSheetId, auth}) => {
    const spreadsheets = await sheets.spreadsheets.get({
        spreadSheetId,
        auth
    })
    return spreadsheets;
}

const getSpreadSheetValues = async({spredSheetId, auth, sheetName}) => {

}

export {getAuth, getSpreadSheet, getSpreadSheetValues};