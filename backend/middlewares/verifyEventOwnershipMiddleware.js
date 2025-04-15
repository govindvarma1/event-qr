import Event from "../models/eventModel.js"; // Assuming Event is the event model

const verifyEventOwnershipMiddleware = async (req, res, next) => {
    try {
        const { eventId } = req.body; // Extract event ID from the request body
        const userId = req.user.userId; // Extract user ID from the authenticated user

        // Find the event by its ID
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check if the event's createdBy matches the user ID
        if (event.createdBy.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to access this event" });
        }

        // Attach event details to the request object for further use
        req.event = event;

        next(); // User is authorized, proceed to the next middleware or route handler
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export default verifyEventOwnershipMiddleware;
