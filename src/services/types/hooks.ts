import { store } from 'utils/store';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { TBurgerIngredientsActions } from "services/actions/burgerIngredients";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TBurgerIngredientsActions>
>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch & AppThunk>()
