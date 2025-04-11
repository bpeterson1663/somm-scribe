import { auth, dc, signInWithGooglePopup } from "@/database";
import type { RootState } from "@/features/store";
import type { AccountT } from "@/schemas/account";
import { defaultAccount } from "@/schemas/account";
import type { AuthUserT, CurrentUser, FetchStatusT, LoginT, MessageT, SignUpT } from "@/types";
import { type GetAccountByIdVariables, createAccount, getAccountById } from "@firebasegen/somm-scribe-connector";
import { type PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

interface InitialAuthState {
  currentUser: CurrentUser;
  status: FetchStatusT;
  message: MessageT;
}

const initialState: InitialAuthState = {
  currentUser: null,
  message: null,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthUserT>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSignUp.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(fetchLogout.fulfilled, (state, _) => {
        state.currentUser = null;
      });
  },
});
export const { setAuth } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;

export const fetchSignUp = createAsyncThunk<
  AuthUserT,
  SignUpT,
  {
    state: RootState;
  }
>("auth/signUp", async (data, { rejectWithValue }) => {
  try {
    const { email, password } = data;
    const authData = await createUserWithEmailAndPassword(auth, email, password);
    const authUser = {
      uid: authData.user.uid,
      email,
    };
    return authUser;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchLogin = createAsyncThunk<
  AuthUserT,
  LoginT,
  {
    state: RootState;
  }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const { email, password } = data;
    const authData = await signInWithEmailAndPassword(auth, email, password);
    const authUser = {
      uid: authData.user.uid,
      email,
    };
    return authUser;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchLogout = createAsyncThunk<
  boolean,
  null,
  {
    state: RootState;
  }
>("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
    return true;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchSignInWithGoogle = createAsyncThunk<
  AccountT | null,
  null,
  {
    state: RootState;
  }
>("auth/signInWithGoogle", async (_, { rejectWithValue }) => {
  try {
    const { user } = await signInWithGooglePopup();
    if (!user.email) {
      return null;
    }
    //TODO: refactor
    const params: GetAccountByIdVariables = { authId: user.uid };

    const responseById = await getAccountById(params);
    if (responseById?.data?.accounts?.length === 1) {
      const account = responseById.data.accounts[0];
      return {
        id: account.id,
        firstName: account.firstName,
        lastName: account.lastName,
        avatar: account.avatar,
        displayName: account.displayName,
        authId: account.authId,
        email: account.email,
        planId: account.plan.id,
      } as AccountT;
    }

    // Create new account
    const { data } = await createAccount(dc, {
      ...defaultAccount,
      email: user.email,
    });

    const response = {
      ...defaultAccount,
      email: user.email,
      id: data.account_insert.id,
    };

    return response as AccountT;
  } catch (err) {
    return rejectWithValue(err);
  }
});
