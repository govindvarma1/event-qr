import { getAuth, getSpreadSheet, getSpreadSheetValues, updateSpreadSheetsValues } from "../services/GoogleSheetServices.js";
import QRCode from "qrcode";

export const ScanQR = async (req, res, next) => {
    try {
        const { id } = req.body;
        console.log(id)
        const auth = await getAuth();
        const spreadsheetId = "1N3lo_mcPvFsW8vry0CZdP0rEvfhW8UGaVjQK-AJzUpo";
        const sheets = await getSpreadSheetValues({spreadsheetId, auth, range: "Sheet1!A2:E1000"});  
        for(let i=0; i<sheets.values.length; i++) {
            if(id === sheets.values[i][1]) {
                return res.status(200).json({couponsLeft: sheets.values[i][4]})
            }
        }
        return res.status(404).json({msg: "User didn't register"})
    } catch(ex) {
        next(ex);
    }
}

export const RedeemQR = async (req, res, next) => {
    try {
        const {id, count} = req.body;
        console.log(count);
        const auth = await getAuth();
        const spreadsheetId = "1N3lo_mcPvFsW8vry0CZdP0rEvfhW8UGaVjQK-AJzUpo";
        const sheets = await getSpreadSheetValues({spreadsheetId, auth, range: "Sheet1!A2:E1000"});  
        for(let i=0; i<sheets.values.length; i++) {
            if(id === sheets.values[i][1]) {
                if (sheets.values[i][4] === "0") {
                    return res.status(401).json({msg: "All Coupons Scanned"});
                } else {
                    updateSpreadSheetsValues({spreadsheetId, auth, range: `Sheet1!E${i+2}:E${i+2}`, data: [[sheets.values[i][4]-count]]});
                    return res.status(200).json({msg: "Scanned Sucessfully", couponsLeft: sheets.values[i][4]-1});
                }
            }
        }
        return res.status(404).json({msg: "User didn't register"})
    } catch (ex) {
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