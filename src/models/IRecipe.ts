export interface IRecipe {
  id: string;
  name: string;
  time: number;
  imageCover: string;
  nrPortions: number;
  instructions: string[];
  ingredients: IRecipeIngredient[];
}

export interface IIngredient {
  id: string;
  cover?: string;
  name: string;
}

export interface IRecipeIngredient {
  name: string;
  amount: number;
  measureType: string;
}

export interface IInstruction {
  description: string;
  done: boolean;
}
