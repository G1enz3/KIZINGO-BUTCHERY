
import React, { useState } from 'react';
import { Recipe } from '../types';
import { generateRecipes } from '../services/geminiService';
import Button from './ui/Button';
import Spinner from './ui/Spinner';

interface RecipeGeneratorProps {
  productName: string;
}

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
    <h4 className="text-2xl font-bold text-primary-700 dark:text-primary-400 mb-2">{recipe.recipeName}</h4>
    <p className="text-gray-600 dark:text-gray-400 mb-4 italic">{recipe.description}</p>
    
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h5 className="text-lg font-semibold mb-2">Ingredients</h5>
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
        </ul>
      </div>
      <div>
        <h5 className="text-lg font-semibold mb-2">Instructions</h5>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
          {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </div>
    </div>
  </div>
);


const RecipeGenerator: React.FC<RecipeGeneratorProps> = ({ productName }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipes = async () => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);
    try {
      const generated = await generateRecipes(productName);
      setRecipes(generated);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12 p-6 bg-primary-50 dark:bg-gray-800/50 rounded-lg">
      <div className="text-center">
         <h3 className="text-2xl md:text-3xl font-bold mb-2">Need Inspiration?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Let our AI Recipe Assistant help you cook something amazing with {productName}!</p>
        <Button onClick={handleGenerateRecipes} disabled={isLoading} size="lg">
          {isLoading ? 'Generating...' : 'Get Recipe Ideas'}
        </Button>
      </div>
      
      {isLoading && <div className="mt-8"><Spinner /></div>}
      
      {error && <p className="mt-8 text-center text-red-500 bg-red-100 dark:bg-red-900/50 p-3 rounded-md">{error}</p>}
      
      {recipes.length > 0 && (
        <div className="mt-10 space-y-8">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;
