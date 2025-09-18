

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; 
const MODEL_NAME = "gemini-1.5-flash"; 
async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, },
  ];

  try {
    const chat = model.startChat({ 
      generationConfig,
      safetySettings,
      history: [], 
    });
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return response.text(); 
  } catch (error) {
    console.error("Error calling Gemini API in gemini.js:", error);
    return "Error: Could not get response."; 
  }
}

export default runChat;

