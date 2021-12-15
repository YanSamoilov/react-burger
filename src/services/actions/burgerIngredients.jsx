import { getIngredientsData } from "utils/api";

export const GET_FEED = 'GET_FEED';
export const GET_FEED_SUCCESS = 'GET_FEED_SUCCESS';
export const GET_FEED_FAILED = 'GET_FEED_FAILED';

//Получить массив ингредиентов от сервера.
export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_FEED
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
        feed: error,
      })
    })
  }
}
