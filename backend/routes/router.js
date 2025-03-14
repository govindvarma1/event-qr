import express from "express";
import { GenerateQR, RedeemQR, ScanQR } from "../controllers/QRController.js";
import adminRouter from "./adminRoutes.js"; // Import admin routes

const router = express.Router();

router.get("/", (req, res) => {
    res.send("You are on home route");
});
router.post("/generate-qr", GenerateQR);
router.post("/scan-qr", ScanQR);
router.post("/redeem-qr", RedeemQR);

router.use("/admin", adminRouter); // Use admin routes

export default router;
