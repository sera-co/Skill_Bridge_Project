import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


connectDB();


app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to SkillBridge Backend API");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
