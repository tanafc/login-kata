import { RecipeRepository } from "./RecipeRepository";
import { Recipe } from "./Recipes";

const API_TOKEN = "xxx";


export class RecipeRepositoryHttp implements RecipeRepository {
  async saveRecipe(recipe: Recipe): Promise<void> {
    await fetch("https://backend-login-placeholder.deno.dev/api/v2/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_token: API_TOKEN,
      },
      body: JSON.stringify(recipe),
    })
  }

  deleteRecipe(recipeId: string): Promise<void> {
    return fetch(`https://backend-login-placeholder.deno.dev/api/v2/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        api_token: API_TOKEN,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "error") {
        throw new Error(data.code);
      }
    });
  }

  async getRecipes(): Promise<Recipe[]> {
    return fetch("https://backend-login-placeholder.deno.dev/api/v2/recipes", {
      headers: {
        api_token: API_TOKEN,
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if (data.status === "error") {
        throw new Error(data.code);
      }
      return data.payload;
    });
  }
}
