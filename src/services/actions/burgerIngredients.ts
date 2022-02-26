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

export const getFeedRequest = (): IGetFeedRequest => ({
  type: GET_FEED_REQUEST
});

export const getFeedSuccess = (feed: IIngredient[]): IGetFeedSuccess => ({
  type: GET_FEED_SUCCESS,
  feed
});

export const getFeedFailed = (error: string): IGetFeedFailed => ({
  type: GET_FEED_FAILED,
  error
});

// Получить массив ингредиентов от сервера.
export const getIngredients: AppThunk = () => {
  return function (dispatch) {
    dispatch(getFeedRequest());
    getIngredientsData()
      .then((res) => {
        dispatch(getFeedSuccess(res.data))
      })
      .catch((error) => {
        dispatch(getFeedFailed(error))
      })
  }
}
