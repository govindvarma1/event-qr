import express from "express";
import { loginUser, registerUser } from "../controllers/adminAuthController.js";
import { verifyToken } from "../controllers/adminAuthController.js";

const router = express.Router();

// Admin login route (no middleware needed)
router.post("/login", loginUser);

// Admin register route (no middleware needed)
router.post("/register", registerUser);
router.post("/verify-token", verifyToken);

export default router;
