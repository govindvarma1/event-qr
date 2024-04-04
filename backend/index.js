const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
    res.send("You are on home route");
})

app.listen(process.env.PORT, ()=> {
    console.log("Server running on port 5000");
})