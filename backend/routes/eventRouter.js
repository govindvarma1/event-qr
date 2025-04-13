import { Router } from 'express';
import { createEvent, getUserEvents } from '../controllers/eventController.js';
import adminAuthMiddleware from '../middlewares/adminAuthMiddleware.js';

const router = Router();

// Route for creating an event
router.post('/create-event', adminAuthMiddleware, createEvent);

// Route for fetching all events created by a specific user
router.get('/get-events', adminAuthMiddleware, getUserEvents);

export default router;