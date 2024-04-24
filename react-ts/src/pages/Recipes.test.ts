import { describe, expect, it } from "vitest";
import { RecipeRepositoryHttp } from "./RecipeRepositoryHttp";
import { after } from "node:test";

const recipe = {
  id: "8y238y32",
  name: "Pizza Oscar Tana Nuria",
  ingredients: ["Dough", "Tomato sauce", "Cheese", "Basil"],
}

describe('Recipes', () => {

  after(() => {
    const recipeRepository = new RecipeRepositoryHttp();
    recipeRepository.deleteRecipe("8y238y32");
  })

  it('should post a new recipe', async () => {
    const recipeRepository = new RecipeRepositoryHttp();
    
    await recipeRepository.saveRecipe(recipe);
    const recipes = await recipeRepository.getRecipes();

    expect(recipes).toContainEqual(recipe);
  });


  it('should delete a recipe', async () => {
    const recipeRepository = new RecipeRepositoryHttp();

    await recipeRepository.saveRecipe(recipe);
    await recipeRepository.deleteRecipe(recipe.id);
    const recipes = await recipeRepository.getRecipes();

    expect(recipes).not.toContainEqual(recipe);
  });

});