// import Resource from "../models/resourceLibrary.js";

// /**
//  * Query params:
//  *  q - search query (title/tags)
//  *  free - true/false
//  *  certified - true/false
//  *  difficulty - beginner|intermediate|advanced
//  *  limit - number
//  */
// export const searchResources = async (req, res) => {
//   try {
//     const { q, free, certified, difficulty, limit = 20 } = req.query;
//     const filter = {};

//     if (q) {
//       const re = new RegExp(q, "i");
//       filter.$or = [{ title: re }, { tags: re }, { source: re }];
//     }
//     if (free !== undefined) filter.free = free === "true";
//     if (certified !== undefined) filter.certified = certified === "true";
//     if (difficulty) filter.difficulty = difficulty;

//     const results = await Resource.find(filter).sort({ popularity: -1 }).limit(Number(limit));
//     res.json(results);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getResourceById = async (req, res) => {
//   try {
//     const resource = await Resource.findById(req.params.id);
//     if (!resource) return res.status(404).json({ message: "Resource not found" });
//     res.json(resource);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
