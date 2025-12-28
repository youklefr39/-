import { GoogleGenAI, Type } from "@google/genai";
import { DailyVerse } from '../types';
import { getFallbackVerse } from '../constants';
import { Language } from '../utils/translations';

const apiKey = process.env.API_KEY || '';

// Safely initialize API only if key exists
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const fetchDailyInspiration = async (lang: Language = 'ar'): Promise<DailyVerse> => {
  if (!ai) {
    console.warn("API Key missing, using fallback verse.");
    return getFallbackVerse(lang);
  }

  try {
    const model = 'gemini-3-flash-preview';
    const langPrompt = lang === 'ar' ? 'in Arabic' : 'in English';
    const prompt = `Provide a short, inspiring Quranic verse or Hadith suitable for a family dashboard ${langPrompt}. Focus on themes of patience, gratitude, family bonding, or kindness. Return strictly JSON.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "The text of the verse or hadith" },
            source: { type: Type.STRING, description: "The surah/verse number or narrator" },
            theme: { type: Type.STRING, description: "A very short 1-2 word theme" }
          },
          required: ["text", "source", "theme"]
        }
      }
    });

    const data = JSON.parse(response.text);
    return data as DailyVerse;

  } catch (error) {
    console.error("Gemini API error:", error);
    return getFallbackVerse(lang);
  }
};
