import { Router } from "express";
import { scanQR, redeemQR, generateQR } from "../controllers/EventQRController.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";
import verifyEventOwnershipMiddleware from "../middlewares/verifyEventOwnershipMiddleware.js";

const router = Router();

// Route to scan a QR code
router.post("/scan", adminAuthMiddleware, verifyEventOwnershipMiddleware, scanQR);

// Route to redeem a QR code
router.post("/redeem", adminAuthMiddleware, verifyEventOwnershipMiddleware, redeemQR);

// Route to generate QR codes
router.post("/generate", adminAuthMiddleware, verifyEventOwnershipMiddleware, generateQR);

export default router;
