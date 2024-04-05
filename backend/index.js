import express from "express";
import { GenerateQR, ScanQR } from "./controllers/QRController.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
    res.send("You are on home route");
})

app.get("/generate-qr", GenerateQR);
app.get("/scan-qr/:id", ScanQR);

app.listen(process.env.PORT, ()=> {
    console.log("Server running on port 5000");
})

