import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QrScanner from "qr-scanner";

const ScanEvent = () => {
	const { eventId } = useParams(); // Get event ID from route params
	const videoElementRef = useRef(null);
	const [scanned, setScannedText] = useState("");
	const [isValidUser, setIsValidUser] = useState(false); // Track user validity
	const [eventDetails, setEventDetails] = useState(null); // Store event details
	const navigate = useNavigate();

	useEffect(() => {
		// Verify if the user is logged in
		const verifyUser = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				navigate("/login"); // Redirect to login if no token
				return;
			}

			try {
				const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify-token`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error("Invalid or expired token.");
				}

				setIsValidUser(true); // Mark user as valid
			} catch (err) {
				console.error(err.message);
				navigate("/login"); // Redirect to login on error
			}
		};

		verifyUser();
	}, [navigate]);

	useEffect(() => {
		if (!isValidUser) return; // Wait until user validity is confirmed

		// Fetch event details based on event ID
		const fetchEventDetails = async () => {
			const token = localStorage.getItem("token");
			try {
				const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/events/${eventId}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch event details.");
				}

				const data = await response.json();
				setEventDetails(data); // Store event details
			} catch (err) {
				console.error(err.message);
			}
		};

		fetchEventDetails();
	}, [isValidUser, eventId]);

	useEffect(() => {
		if (!isValidUser) return; // Wait until user validity is confirmed

		const video = videoElementRef.current;
		const qrScanner = new QrScanner(
			video,
			(result) => {
				console.log("Decoded QR code:", result);
				setScannedText(result.data);
			},
			{
				returnDetailedScanResult: true,
				highlightScanRegion: true,
				highlightCodeOutline: true,
			}
		);

		qrScanner.start();
		console.log("QR Scanner started");

		return () => {
			qrScanner.stop();
			qrScanner.destroy();
			console.log("QR Scanner stopped and destroyed");
		};
	}, [isValidUser]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
			{isValidUser ? (
				<>
					<h1 className="text-3xl font-bold mb-6">Scan Event QR Code</h1>
					{eventDetails && (
						<div className="mb-6 text-center">
							<h2 className="text-xl font-semibold">{eventDetails.name}</h2>
							<p className="text-gray-600">{eventDetails.description}</p>
							<p className="text-sm text-gray-500">
								Event Date: {new Date(eventDetails.date).toLocaleString()}
							</p>
						</div>
					)}
					<div className="flex items-center justify-center mb-4">
						<video
							className="object-cover border border-gray-300 w-80 h-80 rounded-3xl"
							ref={videoElementRef}
						/>
					</div>
					<p className="break-words text-lg mb-4">
						<strong>Scanned:</strong> {scanned || "Waiting for QR code..."}
					</p>
					<button
						onClick={() => alert("Scan Coupon functionality coming soon!")}
						className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Scan Coupon
					</button>
				</>
			) : (
				<p className="text-lg">Verifying user...</p>
			)}
		</div>
	);
};

export default ScanEvent;
