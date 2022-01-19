import { ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from '../constants/ingredientDetails';
import { IIngredient } from '../types/data';

export interface IAddIngredientDetails {
  readonly type: typeof ADD_INGREDIENT_DETAILS;
  ingredientDetails: IIngredient;
}

export interface IRemoveIngredientDetails {
  readonly type: typeof REMOVE_INGREDIENT_DETAILS;
}

export type TIngredientDetails = IAddIngredientDetails | IRemoveIngredientDetails;
