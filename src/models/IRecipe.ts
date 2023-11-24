export interface IRecipe {
  id: string;
  name: string;
  time: number;
  imageCover: string;
  nrPortions: number;
  instructions: string[];
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
  name: string;
  amount: number;
  measureType: string;
}

export interface IInstruction {
  description: string;
  done: boolean;
}
