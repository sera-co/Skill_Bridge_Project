import { OpenAI } from "openai";

const hasOpenAI = !!process.env.OPENAI_API_KEY;
let openai = null;
if (hasOpenAI) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export const generateRoadmap = async ({ goal, currentLevel = "beginner", preferences = {}, userId }) => {
  if (!hasOpenAI) throw new Error("OPENAI_API_KEY not configured");

  const systemPrompt = `You are an expert learning path generator. Given a user's goal, current level, and preferences, generate a concise, structured learning plan with 6-8 ordered steps. Each step should include: title, description, a project idea, and 2-3 resource suggestions (title + url + free:boolean + certified:boolean + estimatedHours). Respond JSON only.`;

  const userPrompt = JSON.stringify({ goal, currentLevel, preferences, userId });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Generate roadmap for: ${userPrompt}` }
    ],
    max_tokens: 800
  });


  const raw = response.choices?.[0]?.message?.content || response.choices?.[0]?.text || "";
  
  const jsonStart = raw.indexOf("{");
  const jsonEnd = raw.lastIndexOf("}");
  if (jsonStart >= 0 && jsonEnd >= 0) {
    const jsonStr = raw.substring(jsonStart, jsonEnd + 1);
    try {
      const parsed = JSON.parse(jsonStr);
      return parsed;
    } catch (e) {
      throw new Error("AI returned unparsable JSON");
    }
  }
  throw new Error("AI response did not contain JSON");
};


export const simpleRoadmapGenerator = ({ goal, currentLevel = "beginner", preferences = {} }) => {
  
  const steps = [
    {
      title: `Understand the basics of ${goal}`,
      description: `Introductory concepts and terminology for ${goal}`,
      project: { title: `Mini ${goal} primer`, description: "Follow a small tutorial and document learnings" },
      resources: [
        { title: `${goal} - Official Docs / Overview`, url: "https://www.google.com/search?q=" + encodeURIComponent(goal + " overview"), source: "Search", free: true, certified: false, estimatedHours: 4 },
        { title: `Beginner course on YouTube for ${goal}`, url: "https://www.youtube.com/results?search_query=" + encodeURIComponent(goal + " for beginners"), source: "YouTube", free: true, certified: false, estimatedHours: 3 }
      ]
    },
    {
      title: `Hands-on: small project for ${goal}`,
      description: `Build a small project to practise core concepts`,
      project: { title: `Simple ${goal} Project`, description: "A small, focused project to practice fundamentals" },
      resources: [
        { title: `freeCodeCamp tutorial`, url: "https://www.freecodecamp.org", source: "freeCodeCamp", free: true, certified: false, estimatedHours: 6 },
        { title: `Coursera course (audit)`, url: "https://www.coursera.org", source: "Coursera", free: true, certified: true, estimatedHours: 20 }
      ]
    },
    {
      title: `Intermediate topics`,
      description: `Level up with intermediate concepts`,
      project: { title: `Portfolio-ready ${goal} project`, description: "Implement a more complete project for your portfolio" },
      resources: [
        { title: `Intermediate course`, url: "https://www.udemy.com", source: "Udemy", free: false, certified: true, estimatedHours: 30 },
        { title: `Official docs deep-dive`, url: "https://developer.mozilla.org/" , source: "Docs", free: true, certified: false, estimatedHours: 8 }
      ]
    },
    {
      title: `Practice & polish`,
      description: `Practice with exercises, challenges, and polish your project`,
      project: { title: `Refine portfolio project`, description: "Add features, tests, and documentation" },
      resources: [
        { title: `GitHub repos to learn from`, url: "https://github.com", source: "GitHub", free: true, certified: false, estimatedHours: 10 }
      ]
    }
  ];

  return {
    goal,
    currentLevel,
    preferences,
    steps
  };
};
