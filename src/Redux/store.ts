import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./auth/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import userRegisterReducer from "./User/userRegisterSlice";

export const store = configureStore({
  reducer: {
    loginSlice: loginSlice.reducer,
    userRegister: userRegisterReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
