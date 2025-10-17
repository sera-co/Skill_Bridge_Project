import { OpenAI } from "openai";
import { simpleRoadmapGenerator } from "./aiService.js"; 

const hasOpenAI = !!process.env.OPENAI_API_KEY;
let openai = null;
if (hasOpenAI) openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const askAIForAdvice = async ({ question, goal, preferences }) => {
  if (!hasOpenAI) {
    
    return `Demo Mentor: For "${question}" about "${goal}", try this: start with a short beginner course on ${goal}, do a small project, then build a portfolio. Use freeCodeCamp and Coursera audit for immediate free resources.`;
  }

  const system = `You are an expert learning mentor. Answer concisely with recommended first steps, 1-2 course/resource links (short), and a 1-line project suggestion. Use user's goal and preferences if provided.`;
  const userPrompt = `Question: ${question}\nGoal: ${goal || "N/A"}\nPreferences: ${JSON.stringify(preferences || {})}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: userPrompt }
    ],
    max_tokens: 300
  });

  const raw = response.choices?.[0]?.message?.content || response.choices?.[0]?.text || "";
  return raw;
};
