import jwt from "jsonwebtoken";

const adminAuthMiddleware = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

	if (!token) {
		return res.status(401).json({ message: "Authentication token is required" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
		req.user = decoded; // Attach user details to the request object
		next();
	} catch (err) {
		res.status(401).json({ message: "Invalid or expired token" });
	}
};

export default adminAuthMiddleware;
