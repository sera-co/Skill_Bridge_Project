import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: String,
  url: String,
  source: String,
  free: { type: Boolean, default: false },
  certified: { type: Boolean, default: false },
  estimatedHours: Number,
  notes: String
}, { _id: false });

const stepSchema = new mongoose.Schema({
  title: String,
  description: String,
  order: Number,
  resources: [resourceSchema],
  project: { title: String, description: String },
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" }
}, { _id: false });

const roadmapSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goal: { type: String, required: true },
  currentLevel: { type: String, default: "beginner" },
  preferences: { type: Object },
  steps: [stepSchema],
  pointsEarned: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

roadmapSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Roadmap = mongoose.model("Roadmap", roadmapSchema);
export default Roadmap;
