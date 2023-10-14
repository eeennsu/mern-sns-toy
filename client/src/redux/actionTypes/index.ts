import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import store from '../store';

export type RootState = ReturnType<typeof store.getState>;

export type RootDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<RootDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;