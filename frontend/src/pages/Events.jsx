import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
	const [events, setEvents] = useState([]);
	const [eventName, setEventName] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const [eventDate, setEventDate] = useState("");
	const [sheetId, setSheetId] = useState("");
	const [sheetName, setSheetName] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEvents = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				navigate("/login"); // Redirect to login if no token
				return;
			}

			try {
				const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/events/get-events`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch events. Please log in again.");
				}

				const data = await response.json();
				setEvents(data.events); // Set fetched events
			} catch (err) {
				setError(err.message);
				navigate("/login"); // Redirect to login on error
			}
		};

		fetchEvents();
	}, [navigate]);

	const handleCreateEvent = async () => {
		if (!eventName || !eventDescription || !eventDate || !sheetId || !sheetName) {
			setError("All fields are required.");
			return;
		}

		setError("");
		setSuccess("");

		const token = localStorage.getItem("token");
		if (!token) {
			setError("You must be logged in to create an event.");
			return;
		}

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/events/create-event`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					name: eventName,
					description: eventDescription,
					date: eventDate,
					sheetId,
					sheetName,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to create event.");
			}

			setSuccess("Event created successfully!");
			setEventName("");
			setEventDescription("");
			setEventDate("");
			setSheetId("");
			setSheetName("");
			setIsModalOpen(false); // Close modal
			// Refresh events list
			const updatedEvents = await response.json();
			setEvents((prevEvents) => [...prevEvents, updatedEvents]);
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
			<div className="w-full max-w-3xl bg-gray-100 p-6 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold mb-6 text-center">Your Events</h1>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				{success && <p className="text-green-500 mb-4">{success}</p>}
				<button
					onClick={() => setIsModalOpen(true)}
					className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
				>
					Create New Event
				</button>
				<ul className="divide-y divide-gray-300">
					{events.length > 0 ? (
						events.map((event) => (
							<li key={event._id} className="py-4">
								<h2 className="text-xl font-semibold">{event.name}</h2>
								<p className="text-gray-600">{event.description}</p>
								<p className="text-sm text-gray-500">Created on: {new Date(event.date).toLocaleString()}</p>
								<button
									onClick={() => navigate(`/events/scan/${event._id}`)}
									className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									Scan
								</button>
							</li>
						))
					) : (
						<p className="text-gray-600 text-center">No events found.</p>
					)}
				</ul>
			</div>

			{/* Modal */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
						<h2 className="text-2xl font-bold mb-4">Create New Event</h2>
						{error && <p className="text-red-500 mb-4">{error}</p>}
						<input
							type="text"
							placeholder="Event Name"
							value={eventName}
							onChange={(e) => setEventName(e.target.value)}
							className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<textarea
							placeholder="Event Description"
							value={eventDescription}
							onChange={(e) => setEventDescription(e.target.value)}
							className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							type="date"
							placeholder="Event Date"
							value={eventDate}
							onChange={(e) => setEventDate(e.target.value)}
							className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							type="text"
							placeholder="Sheet ID"
							value={sheetId}
							onChange={(e) => setSheetId(e.target.value)}
							className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<input
							type="text"
							placeholder="Sheet Name"
							value={sheetName}
							onChange={(e) => setSheetName(e.target.value)}
							className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
						<div className="flex justify-end">
							<button
								onClick={() => setIsModalOpen(false)}
								className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2"
							>
								Cancel
							</button>
							<button
								onClick={handleCreateEvent}
								className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
							>
								Create
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Events;
