
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from '../types';

// Assume API_KEY is set in the environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Recipe generation will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const recipeSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      recipeName: {
        type: Type.STRING,
        description: "The name of the recipe.",
      },
      description: {
        type: Type.STRING,
        description: "A brief, enticing description of the dish."
      },
      ingredients: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "A list of ingredients with quantities.",
      },
      instructions: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
        description: "Step-by-step cooking instructions.",
      },
    },
    required: ["recipeName", "description", "ingredients", "instructions"],
  },
};

export const generateRecipes = async (productName: string): Promise<Recipe[]> => {
  if (!API_KEY) {
    // Return mock data if API key is not available
    return Promise.resolve([
        {
            recipeName: "Mock Grilled Steak",
            description: "A delicious mock recipe for grilled steak. Please set your Gemini API key to see real recipes.",
            ingredients: ["1kg " + productName, "Salt", "Pepper", "Olive Oil"],
            instructions: ["Season the steak.", "Grill to desired doneness.", "Let it rest before slicing."],
        }
    ]);
  }

  try {
    const prompt = `Generate 2 simple and delicious recipes for "${productName}" that are popular or suitable for Kenyan cuisine. Provide ingredients and step-by-step instructions.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const recipes: Recipe[] = JSON.parse(jsonText);
    return recipes;

  } catch (error) {
    console.error("Error generating recipes with Gemini:", error);
    throw new Error("Failed to generate recipe ideas. Please try again later.");
  }
};
