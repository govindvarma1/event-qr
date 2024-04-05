export const ScanQR = async (req, res, next) => {
    try {
        res.send("ScanQR");
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