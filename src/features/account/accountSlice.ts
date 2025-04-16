import { dc } from "@/database";
import type { RootState } from "@/features/store";
import { type AccountT, defaultAccount } from "@/schemas/account";
import type { FetchStatusT, MessageT } from "@/types";
import {
  CreateAccountVariables,
  type GetAccountByIdVariables,
  type UpdateAccountVariables,
  createAccount,
  getAccountById,
  updateAccount,
} from "@firebasegen/somm-scribe-connector";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialUserState {
  account: AccountT;
  status: FetchStatusT;
  message: MessageT;
}

const initialState: InitialUserState = {
  account: defaultAccount,
  status: "idle",
  message: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createAccountThunk.fulfilled, (state, action) => {
        state.account = action.payload;
      })
      .addCase(getAccountByIdThunk.fulfilled, (state, action) => {
        state.account = action.payload;
      })
      .addCase(editAccountThunk.fulfilled, (state, action) => {
        state.account = action.payload;
      });
  },
});

export const accountSelector = (state: RootState) => state.account;

export default accountSlice.reducer;

export const createAccountThunk = createAsyncThunk<
  AccountT,
  AccountT,
  {
    state: RootState;
  }
>("account/createAccount", async (request, { rejectWithValue }) => {
debugger;  
  try {
    const { name, planId, email, authId, onboardingComplete } = request
    const createdAt = new Date().toISOString();
    const account: CreateAccountVariables = {
      name,
      plan: {
        id: planId
      },
      email,
      authId,
      onboardingComplete,
      createdAt,
      updatedAt: createdAt,
    };

    const { data } = await createAccount(dc, account);
    debugger
    const response: AccountT = {
      ...request,
      id: data.account_insert.id,
    };

    return response;
  } catch (err) {
    console.error(err)
    return rejectWithValue(err);
  }
});

export const getAccountByIdThunk = createAsyncThunk<
  AccountT,
  string,
  {
    state: RootState;
  }
>("account/getAccountById", async (authId, { rejectWithValue }) => {
  try {
    const params: GetAccountByIdVariables = { authId };
    const { data } = await getAccountById(params);

    if (data.accounts.length === 1) {
      const account = data.accounts[0];
      return {
        id: account.id,
        name: account.name,
        authId: account.authId,
        email: account.email,
        planId: account.plan.id,
        onboardingComplete: account.onboardingComplete
      } as AccountT;
    }

    return defaultAccount;
  } catch (err) {
    console.error(err)
    return rejectWithValue(err);
  }
});

export const editAccountThunk = createAsyncThunk<
  AccountT,
  AccountT,
  {
    state: RootState;
  }
>("account/editAccount", async (data, { rejectWithValue }) => {
  try {
    const { id, name, authId, email, onboardingComplete } = data;
    
    const request: UpdateAccountVariables = {
      name,
      id,
      authId,
      email,
      plan: {
        id: data.planId
      },
      onboardingComplete,
      updatedAt: new Date().toISOString()
    };

    await updateAccount(request);
    return data;
  } catch (err) {
    console.error({ err });
    return rejectWithValue(err);
  }
});
