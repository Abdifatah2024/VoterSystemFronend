import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./auth/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import userRegisterReducer from "./User/userRegisterSlice";
import voterReducer from "./VoterSlice/voterSlice";
import voterSummaryReducer from "./VoterSlice/voterSummarySlice";
import voterUploadReducer from "../Redux/VoterSlice/voterUploadSlice";
import changePasswordReducer from "../Redux/User/changePasswordSlice";

export const store = configureStore({
  reducer: {
    loginSlice: loginSlice.reducer,
    userRegister: userRegisterReducer,
    voter: voterReducer,
    voterSummary: voterSummaryReducer,
    voterUpload: voterUploadReducer,
    changePassword: changePasswordReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
