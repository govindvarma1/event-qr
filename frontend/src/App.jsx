import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Scan from "./pages/Scan";
import Login from "./pages/admin/auth/Login";
import Register from "./pages/admin/auth/Register";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/scan" element={<Scan />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
