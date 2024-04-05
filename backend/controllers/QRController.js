import { getAuth, getSpreadSheet, getSpreadSheetValues, updateSpreadSheetsValues } from "../services/GoogleSheetServices.js";

export const ScanQR = async (req, res, next) => {
    try {
        const auth =await getAuth();
        const spreadsheetId = "1N3lo_mcPvFsW8vry0CZdP0rEvfhW8UGaVjQK-AJzUpo";
        const sheets = await updateSpreadSheetsValues({spreadsheetId, auth, range: "Sheet1!A2:C4", data: [["1", "2", "3"], ["1", "2", "3"], ["1", "2", "3"]]});
        res.send(sheets);
    } catch(ex) {
        next(ex);
    }
}

export const GenerateQR = async (req, res, next) => {
    try {
        res.send("GenerateQR");
    } catch (ex) {
        next(ex);
    }
}