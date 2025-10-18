import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn("⚠️  WARNING: MONGO_URI not found. Running without database.");
      console.warn("⚠️  Some features may not work properly.");
      return;
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    console.warn("⚠️  Continuing without database. Some features may not work.");
    // Don't exit - allow server to run without DB for testing
    // process.exit(1);
  }
};

export default connectDB;
