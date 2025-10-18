# SkillBridge – AI-Powered Learning Path Generator  
**Tagline:** "Bridging skills to careers with AI-guided learning."

[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-blue)](https://ai.google.dev/)
[![React](https://img.shields.io/badge/Frontend-React-61dafb)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)](https://nodejs.org/)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free tier works!)
- Google Gemini API key

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Skill_Bridge.git
   cd Skill_Bridge-main
   ```

2. **Set up environment variables**
   
   **Backend:** Copy the example file and add your credentials
   ```bash
   cd Backend
   cp .env.example .env
   # Now edit .env and add your MongoDB URI and Gemini API key
   ```
   
   Your `Backend/.env` should look like:
   ```env
   MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/SkillBridge
   GEMINI_API_KEY=YOUR_GEMINI_API_KEY
   JWT_SECRET=any_random_secret_string
   PORT=8080
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

   **Frontend:** Copy the example file
   ```bash
   cd ../skillbridge
   cp .env.example .env
   ```
   
   Your `skillbridge/.env` should be:
   ```env
   REACT_APP_API_URL=http://localhost:8080/api
   ```
   
   **📌 Where to get API keys:**
   - **MongoDB**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (FREE)
   - **Gemini API**: Get key from [Google AI Studio](https://aistudio.google.com/app/apikey) (FREE)

3. **Install and Run (ONE command!)**
   ```bash
   npm install && npm start
   ```
   
   That's it! This will:
   - ✅ Install all backend dependencies
   - ✅ Install all frontend dependencies
   - ✅ Start both servers automatically

4. **Access the app**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

---

## 📖 Manual Setup (Alternative)

If you prefer to run frontend and backend separately:

**Terminal 1 - Backend:**
```bash
cd Backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd skillbridge
npm install
npm start
```

---

## 1. Project Title  
**SkillBridge – Personalized Learning Path Generator**

---

## 2. Team Members  
- Sera  
- Adrina  
- Rahul  
- Senorita  
- Alan  

---

## 3. Problem Statement  
Learners often struggle to identify the right sequence of courses, projects, and resources to acquire new skills or pursue a career. Scattered online materials, inconsistent guidance, and lack of personalized learning paths lead to wasted time, confusion, and demotivation.  
**SkillBridge** aims to provide AI-generated, step-by-step learning roadmaps tailored to each user’s knowledge level, goals, and learning pace, ensuring efficient skill acquisition and career readiness.

---

## 4. Core Components  

### **UI**
- Web App (React.js) and Mobile App (React Native)  
- Input forms for career/skill goal, current knowledge level, and learning preferences  
- Visual roadmap/dashboard displaying learning steps, milestones, and recommended resources  

### **LLM API**
- OpenAI GPT API (or similar) to generate structured learning paths  
- Converts user goals and inputs into a step-by-step learning roadmap  
- Integrates with a knowledge base of courses, tutorials, books, and projects  

### **Tools**
- **Database:** MongoDB to store user profiles, learning paths, and progress  
- **Visualization Library:** D3.js or Chart.js to display roadmap timelines and milestones  
- **Notification System (optional):** Email or push notifications for milestones or reminders  
- **Backend:** Node.js / Express.js for handling requests and storing data  

---

## 5. LLM’s Primary Task  
- Understand user goals, current knowledge level, and preferences  
- Generate personalized step-by-step learning plans  
- Recommend resources, projects, and milestones  
- Adapt roadmap dynamically if user progress or inputs change  

---# skillbridgeproai
