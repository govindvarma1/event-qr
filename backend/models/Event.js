import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	date: { type: Date, required: true },
	createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who created the event
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
