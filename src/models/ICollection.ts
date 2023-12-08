import { IRecipe } from "./IRecipe";

export interface ICollection {
  id: string;
  title: string;
  description?: string;
  recipes: string[];
  covers?: string[];
}
