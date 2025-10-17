import Roadmap from "../models/roadmap.js";
import User from "../models/user.js";


export const updateProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { roadmapId, stepOrder, status } = req.body; 

    const roadmap = await Roadmap.findOne({ _id: roadmapId, userId });
    if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });

    const step = roadmap.steps.find(s => s.order === stepOrder);
    if (!step) return res.status(404).json({ message: "Step not found" });

    step.status = status;
    await roadmap.save();

    
    if (status === "completed") {
      const user = await User.findById(userId);
      user.points += 50; 
      user.badges = [...new Set([...user.badges, `Completed step ${stepOrder}`])];

     
      const last = user.lastActiveAt || null;
      const now = new Date();
      if (last) {
        const oneDay = 24 * 60 * 60 * 1000;
        if (now - new Date(last) < oneDay * 2) {
          user.streak = (user.streak || 0) + 1;
        } else {
          user.streak = 1;
        }
      } else {
        user.streak = 1;
      }
      user.lastActiveAt = now;
      await user.save();
    }

    res.json({ roadmap, message: "Progress updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const roadmap = await Roadmap.findOne({ userId });
    if (!roadmap) return res.status(404).json({ message: "Roadmap not found" });
    res.json({ steps: roadmap.steps, pointsEarned: roadmap.pointsEarned });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
