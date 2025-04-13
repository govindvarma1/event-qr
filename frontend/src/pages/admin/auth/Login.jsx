import React, { useState } from "react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false); // Track API request state

	const handleLogin = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true); // Set loading state

		if (!email || !password) {
			setError("Email and password are required");
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || "Login failed");
			}

			const data = await response.json();
			localStorage.setItem("token", data.token); // Store token in local storage
			alert("Login successful!");
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false); // Reset loading state
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
				<form onSubmit={handleLogin}>
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
					{error && <p className="text-red-500 text-sm mb-4">{error}</p>}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						disabled={isLoading} // Disable button when loading
					>
						{isLoading ? "Logging in..." : "Login"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
