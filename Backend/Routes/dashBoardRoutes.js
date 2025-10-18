import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboard } from "../Controllers/dashboardController.js";

const router = express.Router();
router.get("/", protect, getDashboard);

export default router;
