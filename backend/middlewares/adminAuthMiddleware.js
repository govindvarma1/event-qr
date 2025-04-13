import jwt from "jsonwebtoken";

const adminAuthMiddleware = (req, res, next) => {
    const authToken = req.headers.authorization.split(" ")[1];

    if (!authToken) {
        return res.status(401).json({ message: "Authorization token is required" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

        // Attach email and user ID to the request object
        req.user = {
            email: decoded.email,
            userId: decoded.id,
        };

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

export default adminAuthMiddleware;
