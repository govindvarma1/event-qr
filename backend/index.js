import express from "express";
import cors from "cors";
import { GenerateQR, ScanQR } from "./controllers/QRController.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("You are on home route");
})

app.get("/generate-qr", GenerateQR);
app.get("/scan-qr/:id", ScanQR);

app.listen(process.env.PORT, ()=> {
    console.log("Server running on port 5000");
})

