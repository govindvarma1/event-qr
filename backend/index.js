import express from "express";
import cors from "cors";
import { GenerateQR, RedeemQR, ScanQR } from "./controllers/QRController.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("You are on home route");
})

app.post("/generate-qr", GenerateQR);
app.post("/scan-qr", ScanQR);
app.post("/redeem-qr", RedeemQR);

app.listen(process.env.PORT, ()=> {
    console.log("Server running on port 5000");
})

