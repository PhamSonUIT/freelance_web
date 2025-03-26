import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({ origin: "http://localhost:3001", credentials: true }));

import userRoutes from "./routes/user.js";
app.use("/api/user", userRoutes);


connect.getConnection()
    .then(() => console.log("Database connected successfully!"))
    .catch((err) => console.error("Database connection failed:", err));

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
