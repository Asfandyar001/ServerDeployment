const express = require('express');
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const userRouter = require("./routes/userRoutes.js");

mongoose.connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
}).on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

app.get("/", (req, res) => res.send("Backend running!"));
app.use("/api/user", userRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
