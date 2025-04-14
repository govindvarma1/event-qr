import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
	const [events, setEvents] = useState([]);
	const [error, setError] = useState("");
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

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<h1 className="text-3xl font-bold mb-6">Your Events</h1>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<ul className="w-full max-w-2xl bg-white p-4 rounded-lg shadow-md">
				{events.length > 0 ? (
					events.map((event) => (
						<li key={event._id} className="border-b border-gray-200 py-4">
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
					<p className="text-gray-600">No events found.</p>
				)}
			</ul>
		</div>
	);
};

export default Events;
