/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/genai
 */

import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey
});

async function run(prompt) {
  try{
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini", error);
  }
}

export default run;