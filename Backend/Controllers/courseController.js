import Resource from "../models/resourceLibrary.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Resource.find({}).limit(50); 
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
