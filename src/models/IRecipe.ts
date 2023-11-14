export interface IRecipe {
  id: string;
  name: string;
  imageCover: string;
}

export interface IIngredient {
  id: string;
  cover?: string;
  name: string;
}

export interface IIngredientAmount {
  ingredientID: string;
  name: string;
  amount: number;
  measureType: string;
}
