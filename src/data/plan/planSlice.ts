import type { RootState } from "@/data/store";
import type { PlanT } from "@/schemas/plans";
import type { FetchStatusT, MessageT } from "@/types";
import { type ListPlansResponse, listPlans } from "@firebasegen/somm-scribe-connector";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      const planList = action.payload.plans.map((plan) => {
        return {
          ...plan,
        } as PlanT;
      });

      state.planList = planList;
    });
  },
});

export default planSlice.reducer;

export const fetchPlans = createAsyncThunk<
  ListPlansResponse,
  void,
  {
    state: RootState;
  }
>("plans/fetchPlans", async (_, { rejectWithValue }) => {
  try {
    const { data } = await listPlans();
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
