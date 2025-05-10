const express = require('express');
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://Asfandyar:asfandyar123@webdevelopment.qzri4wz.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
}).on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

app.get("/", (req, res) => res.send("Backend running!"));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
