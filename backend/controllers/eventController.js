import Event from '../models/eventModel.js';
import { validationResult } from 'express-validator';

export const createEvent = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.user.userId); // Log the userId for debugging
    const { name, description, sheetId, sheetName } = req.body;
    const createdBy = req.user.id; // Extract userId from middleware

    // Check for required fields
    if (!name || !description || !sheetId || !sheetName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create new event
        const event = new Event({
            name,
            description,
            date: new Date(), // Set the current date and time
            sheetId,
            sheetName,
            createdBy
        });

        // Save event to database
        const savedEvent = await event.save();

        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getUserEvents = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from the token (set by middleware)
        const events = await Event.find({ createdBy: userId }); // Fetch events created by the user
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch events", error: err.message });
    }
};