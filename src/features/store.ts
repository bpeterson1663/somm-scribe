import accountReducer from "@/features/account/accountSlice";
import authReducer from "@/features/auth/authSlice";
import cellarReducer from "@/features/cellar/cellarSlice";
import planReducer from "@/features/plan/planSlice";
import tastingReducer from "@/features/tasting/tastingSlice";
import { type Action, type ThunkAction, configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasting: tastingReducer,
    account: accountReducer,
    cellar: cellarReducer,
    plan: planReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
