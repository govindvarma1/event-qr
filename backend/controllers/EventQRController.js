import { getAuth, getSpreadSheetValues, updateSpreadSheetsValues } from "../services/GoogleSheetServices.js";
import QRCode from "qrcode";

// Helper function to introduce a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const scanQR = async (req, res, next) => {
    try {
        const { id } = req.body; // Extract QR code ID from the request body
        const { sheetId, sheetName } = req.event; // Use event details from middleware
        const auth = await getAuth();
        const sheets = await getSpreadSheetValues({ spreadsheetId: sheetId, auth, range: `${sheetName}!A2:F1000` });
        for (let i = 0; i < sheets.values.length; i++) {
            if (id === sheets.values[i][1]) {
                return res.status(200).json({ excelRow: i + 2, name: sheets.values[i][0], couponsLeft: sheets.values[i][4] });
            }
        }
        return res.status(404).json({ msg: "User didn't register" });
    } catch (ex) {
        next(ex);
    }
};

export const redeemQR = async (req, res, next) => {
    try {
        const { id, count } = req.body; // Extract QR code ID and count from the request body
        const { sheetId, sheetName } = req.event; // Use event details from middleware
        const auth = await getAuth();
        const sheets = await getSpreadSheetValues({ spreadsheetId: sheetId, auth, range: `${sheetName}!A2:F1000` });
        for (let i = 0; i < sheets.values.length; i++) {
            if (id === sheets.values[i][1]) {
                if (sheets.values[i][4] === "0") {
                    return res.status(401).json({ msg: "All Coupons Scanned" });
                } else {
                    updateSpreadSheetsValues({
                        spreadsheetId: sheetId,
                        auth,
                        range: `${sheetName}!E${i + 2}:E${i + 2}`,
                        data: [[sheets.values[i][4] - count]],
                    });
                    return res.status(200).json({ excelRow: i + 2, msg: "Scanned Successfully", couponsLeft: sheets.values[i][4] - count });
                }
            }
        }
        return res.status(404).json({ msg: "User didn't register" });
    } catch (ex) {
        next(ex);
    }
};

export const generateQR = async (req, res, next) => {
    try {
        const { sheetId, sheetName } = req.event; // Use event details from middleware
        const auth = await getAuth();
        const sheets = await getSpreadSheetValues({ spreadsheetId: sheetId, auth, range: `${sheetName}!A2:F1000` });

        const batchSize = 5; // Define batch size to avoid rate-limiting
        for (let i = 0; i < sheets.values.length; i += batchSize) {
            const batch = sheets.values.slice(i, i + batchSize); // Process in batches
            const updates = [];

            for (let j = 0; j < batch.length; j++) {
                const generatedQRCode = await QRCode.toDataURL(batch[j][1]);
                // const generatedQRCode = batch[j][1];
                updates.push({
                    range: `${sheetName}!C${i + j + 2}:C${i + j + 2}`, // Start from row 2
                    data: [[generatedQRCode]],
                });
            }

            // Perform batch updates
            for (const update of updates) {
                await updateSpreadSheetsValues({
                    spreadsheetId: sheetId,
                    auth,
                    range: update.range,
                    data: update.data,
                });
            }

            // Introduce a delay between batches to avoid rate-limiting
            await delay(5000); // Delay for 5 second
        }

        res.status(200).json({ message: "QR codes generated successfully." });
    } catch (ex) {
        next(ex);
    }
};
