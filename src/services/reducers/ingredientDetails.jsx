import { ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from 'services/actions/ingredientDetails';

const  ingredientDetailsInitialState = {
  ingredientDetails: null
}

export const ingredientDetails = (state = ingredientDetailsInitialState, action) => {
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
