import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function askProfessorMetallurgy(question: string, history: { role: "user" | "model", parts: string }[]) {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      ...history.map(h => ({ role: h.role, parts: [{ text: h.parts }] })),
      { role: "user", parts: [{ text: question }] }
    ],
    config: {
      systemInstruction: `You are "Professor Metallurgy", a world-class expert in extractive metallurgy. 
      Your tone is academic, encouraging, and high-tech. 
      You explain complex concepts like pyrometallurgy, hydrometallurgy, and electrometallurgy simply.
      Use LaTeX for chemical formulas when appropriate (e.g., $Fe_2O_3$).
      Keep responses concise and engaging.`,
    }
  });

  const response = await model;
  return response.text;
}
