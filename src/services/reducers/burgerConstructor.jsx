import { ADD_INGREDIENT_INSIDE_CONSTRUCTOR } from 'services/actions/burgerConstructor';
import { REMOVE_INGREDIENT_INSIDE_CONSTRUCTOR } from 'services/actions/burgerConstructor';
import { TOGGLE_BUN_INSIDE_CONSTRUCTOR } from 'services/actions/burgerConstructor';
import { CHANGE_INGREDIENT_POSITION } from 'services/actions/burgerConstructor';

const burgerConstructorInitialState = {
  constructorElem: []
};

export const burgerConstructor = (state = burgerConstructorInitialState, action) => {
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
      // Если булки в массиве нет, то удаление по обычному индексу, иначе к индексу необходимо прибавить 1.
      if (state.constructorElem[0].type !== 'bun') {
        return {
          ...state,
          constructorElem: [...state.constructorElem].filter((item, ind) => ind !== action.ind)
        }
      }
      else {
        return {
          ...state,
          constructorElem: [...state.constructorElem].filter((item, ind) => ind !== action.ind + 1)
        }
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
        constructorElem: [...state.constructorElem].map((item, idx) => {
          if (idx === action.dragIndex) {
            return [...state.constructorElem].find(
              (item, idx) => idx === action.hoverIndex
            );
          } else if (idx === action.hoverIndex) {
            return [...state.constructorElem].find(
              (item, idx) => idx === action.dragIndex
            );
          } else return item;
        }),
      };
    }
    default: {
      return state
    }
  }
}
