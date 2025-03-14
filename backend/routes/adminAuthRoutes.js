import express from "express";
import { loginUser, registerUser } from "../controllers/adminAuthController.js";

const router = express.Router();

// Admin login route
router.post("/login", loginUser);

// Admin register route
router.post("/register", registerUser);

export default router;
