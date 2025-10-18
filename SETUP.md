# 🚀 Quick Setup Guide for SkillBridge

## For Other Developers Cloning This Repo

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/Skill_Bridge.git
cd Skill_Bridge-main
```

### Step 2: Set Up Your Environment Variables

#### Backend Configuration
```bash
cd Backend
cp .env.example .env
```

Edit `Backend/.env` with your credentials:
- Get **MongoDB URI** from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (FREE)
- Get **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/app/apikey) (FREE)

#### Frontend Configuration
```bash
cd ../skillbridge
cp .env.example .env
```

No changes needed unless you change the backend port.

### Step 3: Install & Run
```bash
cd ..  # Back to root directory
npm install && npm start
```

**That's it!** Both frontend and backend will start automatically.

---

## What Gets Installed?

When you run `npm install`, it automatically:
1. ✅ Installs all backend dependencies (Express, MongoDB, Gemini AI, etc.)
2. ✅ Installs all frontend dependencies (React, Axios, Tailwind CSS, etc.)

When you run `npm start`, it automatically:
1. ✅ Starts the backend server on http://localhost:8080
2. ✅ Starts the frontend React app on http://localhost:3000
3. ✅ Opens the app in your browser

---

## Important Notes

### ⚠️ DO NOT commit `.env` files
The `.env` files contain your personal API keys and should **NEVER** be committed to GitHub.

### ✅ The `.env.example` files are templates
These show other developers what variables they need without exposing your actual keys.

### 🔑 Each developer needs their own keys
- MongoDB: Create a free cluster on MongoDB Atlas
- Gemini API: Get a free API key from Google AI Studio

---

## Troubleshooting

### MongoDB Connection Failed?
1. Check your `MONGO_URI` is correct
2. Make sure your IP is whitelisted in MongoDB Atlas (Network Access)
3. Verify database user has read/write permissions

### Gemini API Not Working?
1. Verify your API key is valid
2. Check you have Gemini API enabled in Google AI Studio

### Port Already in Use?
Change the `PORT` in `Backend/.env` and update `REACT_APP_API_URL` in `skillbridge/.env`

---

## Manual Setup (Alternative)

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

