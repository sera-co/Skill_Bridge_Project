import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import roadmapRoutes from "./Routes/roadmapRoutes.js";
import progressRoutes from "./Routes/progressRoutes.js";
import dashboardRoutes from "./Routes/dashboardRoutes.js";
import resourceRoutes from "./Routes/resourceRoutes.js";
import mentorRoutes from "./Routes/mentorRoutes.js";
import aiRoutes from "./Routes/aiRoutes.js";
import courseRoutes from "./Routes/courseRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/mentor", mentorRoutes);
app.use("/api/roadmap", aiRoutes);
app.use("/api/courses", courseRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to SkillBridge Backend API");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
