import { IRecipe } from "./IRecipe";

export interface ICollection {
  id: string;
  title: string;
  recipes: string[];
  covers?: string[];
}
