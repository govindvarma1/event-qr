import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link for redirection

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false); // Track API request state
	const navigate = useNavigate(); // Initialize navigate

	useEffect(() => {
		const verifyToken = async () => {
			const token = localStorage.getItem("token");
			if (!token) return; // If no token, stay on the same page

			try {
				const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify-token`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				if (response.ok) {
					navigate("/"); // Redirect to home if token is valid
				}
			} catch (err) {
				console.error("Token verification failed:", err.message);
			}
		};

		verifyToken();
	}, [navigate]); // Run on component mount

	const handleRegister = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true); // Set loading state

		if (!email || !password || !confirmPassword) {
			setError("All fields are required");
			setIsLoading(false);
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Registration failed");
			}

			navigate("/login"); // Redirect to login after successful registration
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false); // Reset loading state
		}
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
				<form onSubmit={handleRegister}>
					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">Email:</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">Password:</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 font-medium mb-2">Confirm Password:</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={isLoading} // Disable button when loading
					>
						{isLoading ? "Registering..." : "Register"}
					</button>
				</form>
				<p className="text-sm text-gray-600 mt-4 text-center">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-500 hover:underline">
						Login here
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
