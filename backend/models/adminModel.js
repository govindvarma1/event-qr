import mongoose, { Schema } from "mongoose";

const adminSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	events: [
		{
			type: Schema.Types.ObjectId,
			ref: "Event",
		},
	],
}, {
    timestamps: true,
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
