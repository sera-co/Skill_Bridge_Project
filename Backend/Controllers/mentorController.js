// import { askAIForAdvice } from "../services/mentorService.js";

// /**
//  * POST /api/mentor/ask
//  * body: { question: "Which course to take first", goal: "Frontend Developer", preferences: {...} }
//  */
// export const askMentor = async (req, res) => {
//   try {
//     const { question, goal, preferences } = req.body;
//     if (!question) return res.status(400).json({ message: "Question is required" });

//     const answer = await askAIForAdvice({ question, goal, preferences });
//     res.json({ answer });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
