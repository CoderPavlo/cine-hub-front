import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TAppDispatch, TRootState } from "../store/index";

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;