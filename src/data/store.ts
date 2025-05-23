import accountReducer from "@/data/account/accountSlice";
import authReducer from "@/data/auth/authSlice";
import planReducer from "@/data/plan/planSlice";
import tastingReducer from "@/data/tasting/tastingSlice";
import { type Action, type ThunkAction, configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasting: tastingReducer,
    account: accountReducer,
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
