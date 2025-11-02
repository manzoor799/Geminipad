
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is available in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = 'gemini-2.5-flash';

const generateContent = async (prompt: string): Promise<string> => {
    if (!API_KEY) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return "API Key not configured. This is a simulated response.";
    }
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "An error occurred while contacting the AI. Please try again.";
    }
};

export const summarizeText = async (text: string): Promise<string> => {
  const prompt = `Summarize the following text concisely:\n\n---\n\n${text}`;
  return generateContent(prompt);
};

export const rewriteText = async (text: string, tone: string = 'neutral'): Promise<string> => {
  const prompt = `Rewrite the following text in a ${tone} tone:\n\n---\n\n${text}`;
  return generateContent(prompt);
};

export const expandText = async (text: string): Promise<string> => {
  const prompt = `Expand on the following text, adding more detail and depth:\n\n---\n\n${text}`;
  return generateContent(prompt);
};

export const translateText = async (text: string, language: string = 'Urdu'): Promise<string> => {
  const prompt = `Translate the following text to ${language}:\n\n---\n\n${text}`;
  return generateContent(prompt);
};

export const suggestTitle = async (text: string): Promise<string> => {
  const prompt = `Suggest a concise and fitting title for the following note content. Return only the title text, nothing else.\n\n---\n\n${text}`;
  return generateContent(prompt);
};
