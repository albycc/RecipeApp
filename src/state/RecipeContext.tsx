import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { IRecipe } from "../models/IRecipe";



enum RecipeActionType {
    ADD = "ADD",
    DELETE = "DELETE"
}

interface IAction {
    type: RecipeActionType,
    payload: IRecipe;
}

interface IState {
    recipes: IRecipe[]
}

const recipeInitialState: IState = {
    recipes: []
}

type RecipeContext = {
    state: IState,
    dispatch: React.Dispatch<IAction>
}

const RecipeContext = createContext<RecipeContext>({
    state: recipeInitialState,
    dispatch: () => null
});


const recipeReducer = (state: IState, action: IAction) => {
    console.log("recipeReducer action: ", action)
    switch (action.type) {
        case RecipeActionType.ADD:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]

            };
        case RecipeActionType.DELETE:
            return {
                ...state, recipes: state.recipes.filter(recipe => recipe.id !== action.payload.id)

            }
    }

}

interface IProps {
    children?: JSX.Element | JSX.Element[]

}

function RecipeProvider({ children }: IProps) {
    const [state, dispatch] = useReducer(recipeReducer, recipeInitialState)

    return <RecipeContext.Provider value={{ state, dispatch }}>{children}</RecipeContext.Provider>

}

const useRecipeProvider = () => useContext(RecipeContext)

export { RecipeProvider, useRecipeProvider, RecipeActionType }