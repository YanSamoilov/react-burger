import {
  ADD_INGREDIENT_INSIDE_CONSTRUCTOR,
  REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR,
  TOGGLE_BUN_INSIDE_CONSTRUCTOR,
  CHANGE_INGREDIENT_POSITION
} from '../constants/burgerConstructor';
import { TBurgerConstructorActions } from '../actions/burgerConstructor';
import { IIngredient } from '../types/data';

type TBurgerConstructorInitialState = {
  constructorElem: Array<IIngredient>;
}

const burgerConstructorInitialState: TBurgerConstructorInitialState = {
  constructorElem: []
};

export const burgerConstructor = (state = burgerConstructorInitialState, action: TBurgerConstructorActions): TBurgerConstructorInitialState => {
  switch (action.type) {
    case ADD_INGREDIENT_INSIDE_CONSTRUCTOR: {
      // Если добавляется булка, то она становится первой в массиве, иначе ингредиенты добавляются в конец.
      if (action.ingredient.type === 'bun') {
        return {
          ...state,
          constructorElem: [
            action.ingredient,
            ...state.constructorElem
          ]
        }
      }
      else {
        return {
          ...state,
          constructorElem: [
            ...state.constructorElem,
            action.ingredient
          ]
        }
      }
    }
    case REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR: {
      return {
            ...state,
            constructorElem: [...state.constructorElem].filter((item) => item.uid !== action.uid)
          }
    }
    case TOGGLE_BUN_INSIDE_CONSTRUCTOR: {
      return {
        ...state,
        constructorElem: [...state.constructorElem].map(item => item.type === 'bun' ? action.ingredient : item)
      }
    }
    case CHANGE_INGREDIENT_POSITION: {
      return {
        ...state,
        constructorElem: [...state.constructorElem].map((item) => {
          if (item.uid === action.dragUid) {
            return [...state.constructorElem].find(
              (item) => item.uid === action.hoverUid
            )!;
          } else if (item.uid === action.hoverUid) {
            return [...state.constructorElem].find(
              (item) => item.uid === action.dragUid
            )!;
          } else return item;
        }),
      };
    }
    default: {
      return state
    }
  }
}
