import { RootState } from "@/data/store";
import { dc } from "@/database";
import { AccountT, defaultAccount } from "@/schemas/account";
import { createAccount, CreateAccountVariables, getAccountById, GetAccountByIdVariables, updateAccount, UpdateAccountVariables } from "@firebasegen/somm-scribe-connector";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createAccountThunk = createAsyncThunk<
  AccountT,
  AccountT,
  {
    state: RootState;
  }
>("account/createAccount", async (request, { rejectWithValue }) => {

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
