import { ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from '../constants/ingredientDetails';
import { IIngredient } from '../types/data';

export interface IAddIngredientDetails {
  readonly type: typeof ADD_INGREDIENT_DETAILS;
  ingredientDetails: IIngredient;
}

export interface IRemoveIngredientDetails {
  readonly type: typeof REMOVE_INGREDIENT_DETAILS;
  ingredientDetails: null
}

export const addIngredientDetails = (ingredientDetails: IIngredient): IAddIngredientDetails => ({
  type: ADD_INGREDIENT_DETAILS,
  ingredientDetails
});

export const removeIngredientDetails = (ingredientDetails: null): IRemoveIngredientDetails => ({
  type: REMOVE_INGREDIENT_DETAILS,
  ingredientDetails
});

export type TIngredientDetails = IAddIngredientDetails | IRemoveIngredientDetails;
