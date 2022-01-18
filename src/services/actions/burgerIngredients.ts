import { getIngredientsData } from 'utils/api';
import { store } from 'utils/store';
import { IIngredient } from '../types/data';
import {
  GET_FEED_REQUEST,
  GET_FEED_SUCCESS,
  GET_FEED_FAILED
} from '../constants/burgerIngredients';
import { AppThunk } from 'services/types/hooks';

export interface IGetFeedRequest {
  readonly type: typeof GET_FEED_REQUEST;
}

export interface IGetFeedSuccess {
  readonly type: typeof GET_FEED_SUCCESS;
  feed: ReadonlyArray<IIngredient>;
}

export interface IGetFeedFailed {
  readonly type: typeof GET_FEED_FAILED;
  error: string | null;
}

export type TBurgerIngredientsActions =
  | IGetFeedRequest
  | IGetFeedSuccess
  | IGetFeedFailed;

export type RootState = ReturnType<typeof store.getState>;

// Получить массив ингредиентов от сервера.
export const getIngredients:AppThunk = () => {
  return function (dispatch) {
    dispatch({
      type: GET_FEED_REQUEST
    });
    getIngredientsData()
      .then((res) => {
        dispatch({
          type: GET_FEED_SUCCESS,
          feed: res.data
        })
      })
      .catch((error) => {
        dispatch({
          type: GET_FEED_FAILED,
          error: error,
        })
      })
  }
}
