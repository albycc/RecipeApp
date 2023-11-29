export interface IRecipe {
  id: string;
  name: string;
  time: number;
  imageCover: string;
  nrPortions: number;
  instructions: IRecipeInstruction[];
  ingredients: IRecipeIngredient[];
}

export type IMeasure = {
  label: string;
  value: string;
};

export interface IIngredient {
  id: string;
  cover?: string;
  name: string;
}

export interface IRecipeIngredient {
  id: string;
  name: string;
  amount: number;
  measureType: string;
}

export interface IRecipeInstruction {
  id: string;
  description: string;
  done: boolean;
}
