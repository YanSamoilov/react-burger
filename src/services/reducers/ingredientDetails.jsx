import { ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from 'services/actions/ingredientDetails';

const  ingredientDetailsInitialState = {
  isModalActive: false,
  ingredientDetails: null
}

export const ingredientDetails = (state = ingredientDetailsInitialState, action) => {
  switch(action.type) {
    case ADD_INGREDIENT_DETAILS: {
      return {
        ingredientDetails: action.ingredientDetails,
        isModalActive: true
      }
    }
    case REMOVE_INGREDIENT_DETAILS: {
      return {
        ingredientDetails: null,
        isModalActive: false
      }
    }
    default: {
      return state
    }
  }
}
