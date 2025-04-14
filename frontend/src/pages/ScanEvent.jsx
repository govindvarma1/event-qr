import React from "react";
import { useParams } from "react-router-dom";

const ScanEvent = () => {
	const { eventId } = useParams();

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="text-center">
				<h1 className="text-3xl font-bold mb-4">Scan for Event</h1>
				<p className="text-gray-600 mb-6">Event ID: {eventId}</p>
				<button
					onClick={() => alert(`Scanning for event ID: ${eventId}`)}
					className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Start Scanning
				</button>
			</div>
		</div>
	);
};

export default ScanEvent;
