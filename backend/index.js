import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database", error);
});

