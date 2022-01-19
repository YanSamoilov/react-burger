import {
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILED
} from 'services/constants/burgerIngredients';
import { IIngredient } from '../types/data';
import { TBurgerIngredientsActions } from '../actions/burgerIngredients';

export type TIngredientsInitialState = {
  isLoading: boolean;
  errorMessage: null | string;
  ingredientsData: ReadonlyArray<IIngredient>;
}

export const ingredientsInitialState: TIngredientsInitialState = {
  isLoading: false,
  errorMessage: null,
  ingredientsData: [],
}

//Редьюсер получения ингредиентов от сервера.
export const feedIngredients = (state = ingredientsInitialState, action: TBurgerIngredientsActions): TIngredientsInitialState => {
  switch (action.type) {
    case GET_FEED_REQUEST: {
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
        ingredientsData: [],
        errorMessage: action.error,
        isLoading: false
      }
    }
    default: {
      return state
    }
  }
}
