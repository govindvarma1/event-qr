import express from "express";
import { GenerateQR, RedeemQR, ScanQR } from "../controllers/QRController.js";
import adminAuthRouter from "./adminAuthRoutes.js";
import eventRouter from "./eventRouter.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("You are on home route");
});
router.post("/generate-qr", GenerateQR);
router.post("/scan-qr", ScanQR);
router.post("/redeem-qr", RedeemQR);

// Use event routes
router.use('/events', eventRouter);

router.use("/auth", adminAuthRouter); // Use admin routes

export default router;
