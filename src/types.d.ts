import { ThunkDispatch } from "redux-thunk";
import { RootState, AppDispatch } from "./store";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppThunkDispatch = ThunkDispatch<RootState, undefined, AppDispatch>;
