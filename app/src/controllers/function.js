import { getSpreadSheetValues, getAuth, updateSpreadSheetsValues } from "./service";

export const ScanQR = async (email) => {
    const spreadsheetId = "1N3lo_mcPvFsW8vry0CZdP0rEvfhW8UGaVjQK-AJzUpo";
    try {
        const auth = await getAuth();
        // Fetch spreadsheet data
        const sheets = await getSpreadSheetValues({ spreadsheetId, auth, range: "Sheet1!A2:E1000" }); // Assuming the 3rd and 5th columns contain the data

        // Check if user email exists in the spreadsheet
        for (let i = 0; i < sheets.values.length; i++) {
            if (email === sheets.values[i][1]) { // Assuming email is in the second column
                // Return 3rd and 4th column values
                return { status: 200, couponsPurchased: sheets.values[i][3], couponsLeft: sheets.values[i][4] };
            }
        }
        // If user not found, rreturn 404 status
        return { status: 404, message: "User not found in the registry" };
    } catch (ex) {
        console.error(ex);
        // Return error status
        return { status: 500, message: "Internal Server Error" };
    }
}


export const resetCouponsLeft = async (email) => {
    const spreadsheetId = "1N3lo_mcPvFsW8vry0CZdP0rEvfhW8UGaVjQK-AJzUpo";
    try {
        const auth = await getAuth();
        // Fetch spreadsheet data
        const sheets = await getSpreadSheetValues({ spreadsheetId, auth, range: "Sheet1!A2:E1000" }); // Assuming the 5th column contains the "coupons left" data

        // Find the row with the matching email
        const rowIndex = sheets.values.findIndex(row => row[1] === email);

        if (rowIndex !== -1) {
            // Update the coupons left column to 0 for the matching row
            await updateSpreadSheetsValues({
                spreadsheetId,
                auth,
                range: `Sheet1!E${rowIndex + 2}:E${rowIndex + 2}`, // Assuming the coupons left column is the 5th column (E)
                data: [[0]]
            });

            return { status: 200, message: "Coupons left reset successfully", couponsLeft: 0 };
        } else {
            // If user not found, return 404 status
            return { status: 404, message: "User not found in the registry" };
        }
    } catch (ex) {
        console.error(ex);
        // Return error status
        return { status: 500, message: "Internal Server Error" };
    }
};


export const reduceCouponsLeft = async (email) => {
    const spreadsheetId = "1N3lo_mcPvFsW8vry0CZdP0rEvfhW8UGaVjQK-AJzUpo";
    try {
        const auth = await getAuth();
        // Fetch spreadsheet data
        const sheets = await getSpreadSheetValues({ spreadsheetId, auth, range: "Sheet1!A2:E1000" }); // Assuming the 5th column contains the "coupons left" data

        // Find the row with the matching email
        const rowIndex = sheets.values.findIndex(row => row[1] === email);

        if (rowIndex !== -1) {
            const currentCouponsLeft = parseInt(sheets.values[rowIndex][4]); // Assuming the 5th column (index 4) contains the "coupons left" data
            if (!isNaN(currentCouponsLeft) && currentCouponsLeft > 0) {
                // Update the coupons left column by reducing it by 1 for the matching row
                const newCouponsLeft = currentCouponsLeft - 1;
                await updateSpreadSheetsValues({
                    spreadsheetId,
                    auth,
                    range: `Sheet1!E${rowIndex + 2}:E${rowIndex + 2}`, // Assuming the 5th column (E) contains the "coupons left" data
                    data: [[newCouponsLeft]]
                });

                return { status: 200, message: "Coupons left reduced successfully", couponsLeft: newCouponsLeft };
            } else {
                return { status: 400, message: "No coupons left to reduce", couponsLeft: currentCouponsLeft }; // Return 400 status if no coupons left to reduce
            }
        } else {
            // If user not found, return 404 status
            return { status: 404, message: "User not found in the registry" };
        }
    } catch (ex) {
        console.error(ex);
        // Return error status
        return { status: 500, message: "Internal Server Error" };
    }
};

