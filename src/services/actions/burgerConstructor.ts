import {
  ADD_INGREDIENT_INSIDE_CONSTRUCTOR,
  REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR,
  TOGGLE_BUN_INSIDE_CONSTRUCTOR,
  CHANGE_INGREDIENT_POSITION
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

export type TBurgerConstructorActions =
  | IAddIngredientInsideConstructor
  | IRemoveIngredientInsideConstructor
  | IToggleBunInsideConstructor
  | IChangeIngredientPosition;
