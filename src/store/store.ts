import { IRecipe } from "@/models/IRecipe";
import AsyncStorage from "@react-native-async-storage/async-storage";

const recipeKey = "@recipes";

export const RecipeStore = {
  setRecipe: async (recipe: IRecipe) => {
    try {
      let recipeList: IRecipe[] = await AsyncStorage.getItem(recipeKey).then(
        (json) => {
          if (json !== null) return JSON.parse(json);
        }
      );
      if (!recipeList) {
        recipeList = [];
      }

      recipeList.push(recipe);
      await AsyncStorage.setItem(recipeKey, JSON.stringify(recipeList));
      return "success";
    } catch (error) {
      return error;
    }
  },
  getRecipes: async (): Promise<IRecipe[]> => {
    const data: IRecipe[] = await AsyncStorage.getItem(recipeKey).then(
      (json) => {
        if (json !== null) {
          return JSON.parse(json);
        }
      }
    );
    return data;
    // try {
    // } catch (error) {
    //   return error;
    // }
  },
  getRecipe: async (id: string): Promise<IRecipe | null> => {
    const data: IRecipe[] = await AsyncStorage.getItem(recipeKey).then(
      (json) => {
        if (json !== null) {
          return JSON.parse(json);
        }
      }
    );
    const recipe = data.find((recipe) => recipe.id === id);
    return recipe ? recipe : null;
  },
  removeItems: async () => {
    await AsyncStorage.removeItem(recipeKey);
  },
};
