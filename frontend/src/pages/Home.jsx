import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const verifyToken = async () => {
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
					navigate("/login"); // Redirect to login if token is invalid
				}
			} catch (err) {
				console.error("Token verification failed:", err.message);
				navigate("/login"); // Redirect to login on error
			}
		};

		verifyToken();
	}, [navigate]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-6">Welcome to Event QR</h1>
				<button
					onClick={() => navigate("/events")}
					className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Go to Events
				</button>
			</div>
		</div>
	);
};

export default Home;
