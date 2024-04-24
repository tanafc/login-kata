import { Recipe } from "./Recipes";

export interface RecipeRepository {
  getRecipes(): Promise<Recipe[]>;
  saveRecipe(recipe: Recipe): Promise<void>;
  deleteRecipe(recipeId: string): Promise<void>;
}
