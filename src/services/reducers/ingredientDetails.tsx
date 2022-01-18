import { ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from 'services/constants/ingredientDetails';
import { TIngredientDetails } from '../actions/ingredientDetails';
import { IIngredient } from '../types/data';

type TingredientDetailsInitialState = {
  ingredientDetails: null | IIngredient;
}

const  ingredientDetailsInitialState: TingredientDetailsInitialState = {
  ingredientDetails: null
}

export const ingredientDetails = (state = ingredientDetailsInitialState, action: TIngredientDetails): TingredientDetailsInitialState => {
  switch(action.type) {
    case ADD_INGREDIENT_DETAILS: {
      return {
        ingredientDetails: action.ingredientDetails,
      }
    }
    case REMOVE_INGREDIENT_DETAILS: {
      return {
        ingredientDetails: null,
      }
    }
    default: {
      return state
    }
  }
}
