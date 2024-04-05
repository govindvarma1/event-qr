import { getAuth, getSpreadSheet, getSpreadSheetValues, updateSpreadSheetsValues } from "../services/GoogleSheetServices.js";
import QRCode from "qrcode";

export const ScanQR = async (req, res, next) => {
    try {
        const { id } = req.params;
        const auth = await getAuth();
        const spreadsheetId = "1N3lo_mcPvFsW8vry0CZdP0rEvfhW8UGaVjQK-AJzUpo";
        const sheets = await getSpreadSheetValues({spreadsheetId, auth, range: "Sheet1!A2:C1000"});  
        for(let i=0; i<sheets.values.length; i++) {
            if(id === sheets.values[i][0]) {
                if (sheets.values[i][2] === "Scanned") {
                    return res.status(401).json({msg: "Already Scanned"});
                } else {
                    updateSpreadSheetsValues({spreadsheetId, auth, range: `Sheet1!C${i+2}:C${i+2}`, data: [["Scanned"]]});
                    return res.status(200).json({msg: "Scanned Sucessfully"});
                }
            }
        }
        return res.status(404).json({msg: "User didn't register"})
    } catch(ex) {
        next(ex);
    }
}

export const GenerateQR = async (req, res, next) => {
    try {
        const auth = await getAuth();
        const spreadsheetId = "1N3lo_mcPvFsW8vry0CZdP0rEvfhW8UGaVjQK-AJzUpo";
        const sheets = await getSpreadSheetValues({spreadsheetId, auth, range: "Sheet1!A2:C1000"});
        for(let i=0; i<sheets.values.length; i++) {
            const generatedQRCode = await QRCode.toDataURL(sheets.values[i][0]);
            updateSpreadSheetsValues({spreadsheetId, auth, range: `Sheet1!B${i+2}:B${i+2}`, data: [[generatedQRCode]]});
        }
        res.send(sheets);
    } catch (ex) {
        next(ex);
    }
}