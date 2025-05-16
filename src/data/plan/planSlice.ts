
import { createSlice } from "@reduxjs/toolkit";

import { fetchPlans } from "@/api/plan";
import type { PlanT } from "@/schemas/plans";
import type { FetchStatusT, MessageT } from "@/types";

export interface InitialPlanState {
  message: MessageT;
  status: FetchStatusT;
  planList: PlanT[];
  plan: PlanT;
}

const initialState: InitialPlanState = {
  message: null,
  status: "idle",
  planList: [],
  plan: {} as PlanT,
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPlans.fulfilled, (state, action) => {
      const planList = action.payload.map((plan) => {
        return {
          ...plan,
        } as PlanT;
      });

      state.planList = planList;
    });
  },
});

export default planSlice.reducer;

