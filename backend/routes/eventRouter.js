import { Router } from 'express';
import { createEvent } from '../controllers/eventController.js';
import adminAuthMiddleware from '../middlewares/adminAuthMiddleware.js';

const router = Router();

// Route for creating an event
router.post('/createEvent', adminAuthMiddleware, createEvent);

export default router;