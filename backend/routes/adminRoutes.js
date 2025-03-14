import express from 'express';
import adminAuthRouter from "./adminAuthRoutes.js"; // Import admin auth routes

const router = express.Router();

router.use("/auth", adminAuthRouter); // Use admin auth routes

export default router;