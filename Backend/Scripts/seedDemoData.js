import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../Config/db.js";
import Resource from "../models/resourceLibrary.js";
import User from "../models/user.js";
import Roadmap from "../models/roadmap.js";

dotenv.config();
await connectDB();

console.log("Seeding demo data...");

await Resource.deleteMany({});
await User.deleteMany({});
await Roadmap.deleteMany({});

const resources = [
  { title: "freeCodeCamp - Responsive Web Design", url: "https://www.freecodecamp.org/learn/responsive-web-design/", source: "freeCodeCamp", tags: ["frontend","html","css"], free: true, certified: false, difficulty: "beginner", estimatedHours: 12, popularity: 95 },
  { title: "Coursera - HTML, CSS, and Javascript for Web Developers (audit)", url: "https://www.coursera.org", source: "Coursera", tags: ["frontend"], free: true, certified: true, difficulty: "beginner", estimatedHours: 24, popularity: 80 },
  { title: "Udemy - The Web Developer Bootcamp", url: "https://www.udemy.com", source: "Udemy", tags: ["frontend"], free: false, certified: true, difficulty: "intermediate", estimatedHours: 40, popularity: 85 },
  { title: "freeCodeCamp - JavaScript Algorithms and Data Structures", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", source: "freeCodeCamp", tags: ["javascript","frontend"], free: true, certified: false, difficulty: "intermediate", estimatedHours: 30, popularity: 90 }
];
await Resource.insertMany(resources);

const demoPassword = await bcrypt.hash("Demopass123", 10);
const demoUser = await User.create({
  name: "Demo User",
  email: "demo@skillbridge.test",
  password: demoPassword,
  preferences: { learningStyle: "project-based", freeOnly: true, certificationRequired: false },
  points: 120,
  badges: ["Getting Started"],
  streak: 3
});


const roadmap = await Roadmap.create({
  userId: demoUser._id,
  goal: "Frontend Developer",
  currentLevel: "beginner",
  preferences: demoUser.preferences,
  steps: [
    {
      title: "HTML & CSS basics",
      description: "Learn HTML structure and CSS styling",
      order: 1,
      resources: [
        { title: "freeCodeCamp - Responsive Web Design", url: "https://www.freecodecamp.org/learn/responsive-web-design/", source: "freeCodeCamp", free: true, certified: false, estimatedHours: 12 }
      ],
      project: { title: "Simple landing page", description: "Create a responsive landing page" },
      status: "completed"
    },
    {
      title: "JavaScript fundamentals",
      description: "Learn JS basics and DOM manipulation",
      order: 2,
      resources: [
        { title: "freeCodeCamp - JavaScript Algorithms", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", source: "freeCodeCamp", free: true, certified: false, estimatedHours: 30 }
      ],
      project: { title: "Interactive portfolio", description: "Add interactive components" },
      status: "pending"
    }
  ]
});

console.log("Seed complete. Demo user credentials:");
console.log("email: demo@skillbridge.test");
console.log("password: Demopass123");
process.exit(0);
