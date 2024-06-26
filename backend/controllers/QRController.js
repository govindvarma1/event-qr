import { getAuth, getSpreadSheet, getSpreadSheetValues, updateSpreadSheetsValues } from "../services/GoogleSheetServices.js";
import QRCode from "qrcode";

export const ScanQR = async (req, res, next) => {
    try {
        const { id } = req.body;
        const auth = await getAuth();
        const spreadsheetId = process.env.SHEET_ID;
        const sheets = await getSpreadSheetValues({spreadsheetId, auth, range: "FOOD_COUPONS_QR!A2:F1000"});  
        for(let i=0; i<sheets.values.length; i++) {
            if(id === sheets.values[i][1]) {
                return res.status(200).json({excelRow: i+2,name: sheets.values[i][0],couponsLeft: sheets.values[i][4]});
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
        const auth = await getAuth();
        const spreadsheetId = process.env.SHEET_ID;
        const sheets = await getSpreadSheetValues({spreadsheetId, auth, range: "FOOD_COUPONS_QR!A2:F1000"});  
        for(let i=0; i<sheets.values.length; i++) {
            if(id === sheets.values[i][1]) {
                console.log(sheets.values[i][4])
                if (sheets.values[i][4] === "0") {
                    return res.status(401).json({msg: "All Coupons Scanned"});
                } else {
                    updateSpreadSheetsValues({spreadsheetId, auth, range: `FOOD_COUPONS_QR!E${i+2}:E${i+2}`, data: [[sheets.values[i][4]-count]]});
                    return res.status(200).json({excelRow: i+2,msg: "Scanned Sucessfully", couponsLeft: sheets.values[i][4]-count});
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
        const {from, to} = req.body;
        const auth = await getAuth();
        const spreadsheetId = process.env.SHEET_ID;
        const sheets = await getSpreadSheetValues({spreadsheetId, auth, range: `FOOD_COUPONS_QR!A${from}:F${to}`});
        for(let i=0; i<sheets.values.length; i++) {
            const generatedQRCode = await QRCode.toDataURL(sheets.values[i][1]);
            updateSpreadSheetsValues({spreadsheetId, auth, range: `FOOD_COUPONS_QR!C${i+from}:C${i+from}`, data: [[generatedQRCode]]});
        }
        res.send(sheets);
    } catch (ex) {
        next(ex);
    }
}