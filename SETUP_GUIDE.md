# Skill_Bridge Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (free tier)
- Google Gemini API key

---

## Step 1: MongoDB Atlas Setup

### Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account
3. Create a new cluster (select the FREE tier)
4. Choose your cloud provider and region
5. Click "Create Cluster" (takes 3-5 minutes)

### Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. **Important**: Replace `<password>` with your actual database user password
5. Add database name: `mongodb+srv://username:password@cluster.mongodb.net/skillbridge`

### Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Create username and strong password
4. Give user "Read and write to any database" permission
5. Click "Add User"

### Whitelist Your IP
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production, add only your server's IP

---

## Step 2: Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy the API key (starts with `AIza...`)
5. Keep this key secure!

---

## Step 3: Backend Setup

### Navigate to Backend Directory
```bash
cd Backend
```

### Create .env File
```bash
cp .env.example .env
```

### Edit .env File
Open `Backend/.env` and add your credentials:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/skillbridge

# JWT Secret (Generate a secure random string)
JWT_SECRET=my_super_secret_jwt_key_12345

# Gemini API Key
GEMINI_API_KEY=AIzaSy...your_actual_key_here

# Server Configuration
PORT=8080
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Install Dependencies
```bash
npm install
```

### Start Backend Server
```bash
npm start
```

You should see:
```
MongoDB Connected Successfully
Server running on port 8080
```

---

## Step 4: Frontend Setup

### Navigate to Frontend Directory
```bash
cd ../skillbridge
```

### Create .env File
```bash
cp .env.example .env
```

The default values should work:
```env
REACT_APP_API_URL=http://localhost:8080/api
```

### Install Dependencies
```bash
npm install
```

### Start Frontend Server
```bash
npm start
```

The app should open at `http://localhost:3000`

---

## Step 5: Test the Application

1. **Register**: Create a new account with any email/password
2. **Login**: Sign in with your credentials
3. **Generate Roadmap**: 
   - Enter a skill (e.g., "React Development")
   - Select your level (Beginner/Intermediate/Advanced)
   - Enter duration (e.g., 30 days)
   - Choose learning format
4. **View Roadmap**: See AI-generated learning path with resources

---

## Troubleshooting

### Backend won't start
- Check MongoDB connection string is correct
- Verify your IP is whitelisted in MongoDB Atlas
- Ensure Gemini API key is valid

### Frontend can't connect to backend
- Make sure backend is running on port 8080
- Check CORS settings in `Backend/server.js`
- Verify `REACT_APP_API_URL` in frontend `.env`

### MongoDB connection error
- Check username/password in connection string
- Verify network access settings
- Try replacing special characters in password with URL encoding

### Gemini API errors
- Verify API key is correct
- Check you have API quota remaining
- Ensure billing is enabled if required

---

## Project Structure

```
Skill_Bridge-main/
├── Backend/                 # Node.js/Express backend
│   ├── Config/             # Database configuration
│   ├── Controllers/        # Route controllers
│   ├── Models/             # MongoDB schemas
│   ├── Routes/             # API routes
│   ├── middleware/         # Auth middleware
│   ├── Utils/              # Utilities (email, etc.)
│   ├── .env                # Environment variables (create this)
│   ├── .env.example        # Environment template
│   ├── package.json        # Backend dependencies
│   └── server.js           # Main server file
│
└── skillbridge/            # React frontend
    ├── src/
    │   ├── components/     # React components
    │   ├── services/       # API service
    │   └── App.js          # Main app component
    ├── .env                # Environment variables (create this)
    ├── .env.example        # Environment template
    └── package.json        # Frontend dependencies
```

---

## Next Steps

- Remove duplicate backend code from root directory
- Implement proper session management
- Add error boundaries to frontend
- Set up production deployment
- Add more features (dashboard, progress tracking, etc.)

---

## Support

For issues, check:
- MongoDB Atlas documentation: https://docs.atlas.mongodb.com/
- Gemini API docs: https://ai.google.dev/docs
- Project issues on GitHub

