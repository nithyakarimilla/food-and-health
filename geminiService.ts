import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getFoodSuggestion(input: string, goal: string) {
  const prompt = `You are NudgeAI, a premium food decision coach. 
  The user is asking: "${input}". 
  Their goal is: "${goal}".
  
  Provide a concise, motivating response in the following format:
  1. 2-3 specific food suggestions that hit the spot but stay on track.
  2. 1 healthier alternative if they mentioned a craving.
  3. A very short (1 sentence) explanation of why these choices are better.
  
  Keep the tone futuristic, minimal, and premium. Use emojis sparingly but effectively.
  If the user just says "I'm hungry", suggest something balanced for the current time of day.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "I'm processing the best options for you...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my knowledge base. Try a simple snack like almonds for now!";
  }
}

export function analyzeMeal(foodName: string): any {
  // Rule-based mapping for demo speed and reliability
  const database: Record<string, any> = {
    "pizza": {
      name: "Pizza",
      calories: 350,
      healthScore: 45,
      tag: "Moderate",
      betterSwap: "Thin crust with double veggies or a salad wrap",
      icon: "🍕"
    },
    "burger": {
      name: "Burger",
      calories: 550,
      healthScore: 40,
      tag: "Unhealthy",
      betterSwap: "Grilled chicken burger or lettuce-wrapped patty",
      icon: "🍔"
    },
    "salad": {
      name: "Fresh Salad",
      calories: 200,
      healthScore: 90,
      tag: "Healthy",
      betterSwap: "Great choice! Keep the dressing on the side.",
      icon: "🥗"
    },
    "sushi": {
      name: "Sushi Rolls",
      calories: 300,
      healthScore: 75,
      tag: "Moderate",
      betterSwap: "Sashimi or brown rice rolls for more fiber",
      icon: "🍣"
    },
    "pasta": {
      name: "Pasta",
      calories: 450,
      healthScore: 55,
      tag: "Moderate",
      betterSwap: "Zucchini noodles or whole-wheat pasta",
      icon: "🍝"
    },
    "donut": {
      name: "Donut",
      calories: 250,
      healthScore: 20,
      tag: "Unhealthy",
      betterSwap: "Greek yogurt with a drizzle of honey",
      icon: "🍩"
    }
  };

  const normalized = foodName.toLowerCase().trim();
  const match = Object.keys(database).find(key => normalized.includes(key));
  
  if (match) return database[match];
  
  // Default fallback for unknown items
  return {
    name: foodName,
    calories: 300,
    healthScore: 60,
    tag: "Moderate",
    betterSwap: "Try a high-protein version of this meal",
    icon: "🍽️"
  };
}
