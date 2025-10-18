import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    learningStyle: { type: String, default: "project-based" }, // or videos, reading
    freeOnly: { type: Boolean, default: false },
    certificationRequired: { type: Boolean, default: false }
  },
  points: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  streak: { type: Number, default: 0 },
  lastActiveAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
