const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const pool = require("./src/lib/db");
const authRoutes = require("./src/routes/authRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS currentTime");
    res.status(200).json({
      message: "MySQL test connection connected successfully",
      time: rows[0].currentTime,
    });
  } catch (error) {
    res.status(500).json({ error: "MySQL test connection connected error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
