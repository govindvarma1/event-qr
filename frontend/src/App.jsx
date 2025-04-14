import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Events from "./pages/Events"; // Import Events page
import ScanEvent from "./pages/ScanEvent"; // Import ScanEvent page

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/scan" element={<Scan />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/events" element={<Events />} /> {/* Add Events route */}
				<Route path="/events/scan/:eventId" element={<ScanEvent />} /> {/* Add dynamic scan route */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
