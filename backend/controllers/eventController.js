import Event from '../models/eventModel.js';
import { validationResult } from 'express-validator';
import { getAuth, getSpreadSheet } from '../services/GoogleSheetServices.js';

export const createEvent = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, sheetId, sheetName } = req.body;
    const createdBy = req.user.userId; // Extract userId from middleware

    // Check for required fields
    if (!name || !description || !sheetId || !sheetName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Verify if the given sheetId and sheetName are correct
        const auth = await getAuth();
        const sheet = await getSpreadSheet({ spreadsheetId: sheetId, auth });

        const sheetExists = sheet.data.sheets.some((sheet) => sheet.properties.title === sheetName);
        if (!sheetExists) {
            return res.status(400).json({ message: 'Invalid sheet name or sheet ID' });
        }

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
        const { userId, email } = req.user; // Extract user ID and email from the request object
        const events = await Event.find({ createdBy: userId }); // Fetch events created by the specific user

        res.status(200).json({
            message: `Events fetched successfully for user: ${email}`,
            events,
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch events", error: err.message });
    }
};

export const getEventDetails = async (req, res) => {
    try {
        const { eventId } = req.params;

        // Fetch event details from the database
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.status(200).json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};