import { store } from 'utils/store';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { AppThunk } from './data';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch & AppThunk>()
