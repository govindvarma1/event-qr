import express from "express";
import { loginUser, registerUser } from "../controllers/adminAuthController.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js"; // Import middleware

const router = express.Router();

// Admin login route (no middleware needed)
router.post("/login", loginUser);

// Admin register route (no middleware needed)
router.post("/register", registerUser);

export default router;
