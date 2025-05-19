
import { createSlice } from "@reduxjs/toolkit";

import { fetchVarietals } from "@/api/varietal";
import type { VarietalT } from "@/schemas/varietals";
import type { FetchStatusT, MessageT } from "@/types";

export interface InitialVarietalState {
  message: MessageT;
  status: FetchStatusT;
  varietalList: VarietalT[];
  varietalsLoaded: boolean;
}

const initialState: InitialVarietalState = {
  message: null,
  status: "idle",
  varietalList: [],
  varietalsLoaded: false,
};

export const varietalSlice = createSlice({
  name: "varietal",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchVarietals.fulfilled, (state, action) => {
      const varietalList = action.payload.map((varietal) => {
        return {
          ...varietal,
        } as VarietalT;
      });

      state.varietalList = varietalList;
      state.varietalsLoaded = true;
    })
  },
});

export default varietalSlice.reducer;

