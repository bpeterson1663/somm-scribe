import { RootState } from "@/data/store";
import { AccountT } from "@/schemas/account";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApiClient } from "@/api/client";

export const createAccountThunk = createAsyncThunk<
  AccountT,
  AccountT,
  {
    state: RootState;
  }
>("account/createAccount", async (request, { rejectWithValue }) => {

  try {
    const { name, planId, email, authId, onboardingComplete } = request
    const body = JSON.stringify({
      name,
      planId,
      email,
      authId,
      onboardingComplete,
    });

    return await authApiClient<AccountT>('/account', {
      method: "POST",
      body,
    });

  } catch (err) {
    console.error(err)
    return rejectWithValue(err);
  }
});

export const getAccountByIdThunk = createAsyncThunk<
  AccountT,
  void,
  {
    state: RootState;
  }
>("account/getAccountById", async (_, { rejectWithValue }) => {
  try {
    return await authApiClient<AccountT>('/account');
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
    const { name, email, onboardingComplete, planId } = data;
    
    const body = JSON.stringify({
      name,
      email,
      planId,
      onboardingComplete,
    });

    return await authApiClient<AccountT>('/account', {
      method: "PUT",
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error({ err });
    return rejectWithValue(err);
  }
});
