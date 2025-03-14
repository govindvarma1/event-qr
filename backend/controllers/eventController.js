import Event from '../models/eventModel.js';
import { validationResult } from 'express-validator';

export const createEvent = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, date, sheetId, sheetName, createdBy } = req.body;

    // Check for required fields
    if (!name || !description || !date || !sheetId || !sheetName || !createdBy) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create new event
        const event = new Event({
            name,
            description,
            date,
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