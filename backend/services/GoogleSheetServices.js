import { google } from "googleapis";
const sheets = google.sheets('v4');

const getAuth = async() => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "./google.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    })
    return await auth.getClient();
}

const getSpreadSheet = async ({ spreadsheetId, auth }) => {
    const response = await sheets.spreadsheets.get({
        spreadsheetId,
        auth
    });
    return response;
}

const getSpreadSheetValues = async({spreadsheetId, auth, range}) => {
    const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        auth,
        range
    })
    return response.data;
}

const updateSpreadSheetsValues = async ({ spreadsheetId, auth, range, data }) => {
    try {
        const response = await sheets.spreadsheets.values.update({
            spreadsheetId,
            auth,
            range,
            valueInputOption: "USER_ENTERED",
            resource: {
                values: data
            }
        });
        console.log(`Updated ${range} Successfully`);
    } catch (error) {
        console.log("error", error);
    }
};

export {getAuth, getSpreadSheet, getSpreadSheetValues, updateSpreadSheetsValues};