import express from "express";
import connect from "../db.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { username, password, confirmPassword, email, phone } = req.body;

        if (!username || !password || !confirmPassword || !email || !phone) 
        {
            return res.status(400).json({ error: "All fields are required." });
        }

        if (password !== confirmPassword) 
        {
            return res.status(400).json({ error: "Passwords do not match." });
        }

        const [existingUser] = await connect.query(
            "SELECT * FROM Users WHERE Username = ? OR Email = ?",
            [username, email]
        );

        if (existingUser && existingUser.length > 0) 
        {
            return res.status(400).json({ error: "Username or Email already exists." });
        }

        const insertQuery = `
            INSERT INTO Users (Username, Password, Email, PhoneNumber, AvartarURL, Skill, CV_URL)
            VALUES (?, ?, ?, ?, 'https://example.com/default-avatar.png', NULL, NULL)
        `;
        const [result] = await connect.query(insertQuery, [username, password, email, phone]);

        const userId = result.insertId;

        return res.status(201).json({ message: "User registered successfully!", userId });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
