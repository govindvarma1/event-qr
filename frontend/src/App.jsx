import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Scan from "./pages/Scan";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Events from "./pages/Events"; // Import Events page
import ScanEvent from "./pages/ScanEvent"; // Import ScanEvent page

function App() {
	return (
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/scan" element={<Scan />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/events" element={<Events />} /> {/* Add Events route */}
					<Route path="/events/scan/:eventId" element={<ScanEvent />} /> {/* Add dynamic scan route */}
					<Route path="/scan/:eventId" element={<ScanEvent />} /> {/* Ensure the route includes :eventId */}
				</Routes>
			</Router>
	);
}

export default App;
