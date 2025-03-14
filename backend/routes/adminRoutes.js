import express from 'express';
import { loginUser, registerUser } from "../controllers/adminAuthController.js";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js"; // Import middleware

const router = express.Router();

// Admin login route (no middleware needed)
router.post("/auth/login", loginUser);

// Admin register route (no middleware needed)
router.post("/auth/register", registerUser);

// Example of a protected route
router.post("/auth/protected", adminAuthMiddleware, (req, res) => {
    res.json({
        message: "This is a protected route",
        admin: req.admin, // Access email and userId from the middleware
    });
});

export default router;