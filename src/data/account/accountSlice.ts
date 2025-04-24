import type { RootState } from "@/data/store";
import { type AccountT, defaultAccount } from "@/schemas/account";
import type { FetchStatusT, MessageT } from "@/types";
import {  createSlice } from "@reduxjs/toolkit";
import { createAccountThunk, getAccountByIdThunk, editAccountThunk } from "@/api/account"
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
