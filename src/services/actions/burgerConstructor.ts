import {
  ADD_INGREDIENT_INSIDE_CONSTRUCTOR,
  REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR,
  TOGGLE_BUN_INSIDE_CONSTRUCTOR,
  CHANGE_INGREDIENT_POSITION,
  CLEAR_CONSTRUCTOR
} from '../constants/burgerConstructor';
import { IIngredient } from '../types/data';

export interface IAddIngredientInsideConstructor {
  readonly type: typeof ADD_INGREDIENT_INSIDE_CONSTRUCTOR;
  ingredient: IIngredient;
}

export interface IRemoveIngredientInsideConstructor {
  readonly type: typeof REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR;
  uid: string;
}

export interface IToggleBunInsideConstructor {
  readonly type: typeof TOGGLE_BUN_INSIDE_CONSTRUCTOR;
  ingredient: IIngredient;
}

export interface IChangeIngredientPosition {
  readonly type: typeof CHANGE_INGREDIENT_POSITION;
  dragUid: string;
  hoverUid: string;
}

export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TBurgerConstructorActions =
  | IAddIngredientInsideConstructor
  | IRemoveIngredientInsideConstructor
  | IToggleBunInsideConstructor
  | IChangeIngredientPosition
  | IClearConstructor


export const toggleBunInsideConstructor = (ingredient: IIngredient): IToggleBunInsideConstructor => ({
  type: TOGGLE_BUN_INSIDE_CONSTRUCTOR,
  ingredient
});

export const addIngredientInsideConstructor = (ingredient: IIngredient): IAddIngredientInsideConstructor => ({
  type: ADD_INGREDIENT_INSIDE_CONSTRUCTOR,
  ingredient
});

export const clearConstructor = (): IClearConstructor => ({
  type: CLEAR_CONSTRUCTOR
});

export const changeIngredientPosition = (dragUid: string, hoverUid: string): IChangeIngredientPosition => ({
  type: CHANGE_INGREDIENT_POSITION,
  dragUid,
  hoverUid
});

export const removeIngredientInsideConstructor = (uid: string): IRemoveIngredientInsideConstructor => ({
  type: REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR,
  uid
});
