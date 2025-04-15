import { Router } from 'express';
import { createEvent, getUserEvents, getEventDetails } from '../controllers/eventController.js';
import adminAuthMiddleware from '../middlewares/adminAuthMiddleware.js';

const router = Router();

// Route for creating an event
router.post('/create-event', adminAuthMiddleware, createEvent);

// Route for fetching all events created by a specific user
router.get('/get-events', adminAuthMiddleware, getUserEvents);

// Route to get all information related to an event
router.get('/:eventId', adminAuthMiddleware, getEventDetails);

export default router;