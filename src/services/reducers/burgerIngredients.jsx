import {
  GET_FEED,
  GET_FEED_SUCCESS,
  GET_FEED_FAILED
} from 'services/actions/burgerIngredients';

const ingredientsInitialState = {
  isLoading: false,
  errorMessage: null,
  ingredientsData: [],
}

//Редьюсер получения ингредиентов от сервера.
export const feedIngredients = (state = ingredientsInitialState, action) => {
  switch(action.type) {
    case GET_FEED: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_FEED_SUCCESS: {
      return {
        ...state,
        ingredientsData: action.feed,
        isLoading: false
      };
    }
    case GET_FEED_FAILED: {
      return {
        ...state,
        errorMessage: action.feed,
        isLoading: false
      }
    }
    default: {
      return state
    }
  }
}
