import { Router } from "express";
import { GenerateQR, RedeemQR, ScanQR } from "../controllers/QRController.js";

const router = Router();

router.get("/", (req, res) => {
	res.send("You are on home route");
});
router.post("/generate-qr", GenerateQR);
router.post("/scan-qr", ScanQR);
router.post("/redeem-qr", RedeemQR);

export default router;
