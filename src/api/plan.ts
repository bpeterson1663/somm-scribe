import { RootState } from "@/data/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "./client";
import { PlanT } from "@/schemas/plans";

export const fetchPlans = createAsyncThunk<
  PlanT[],
  void,
  {
    state: RootState;
  }
>("plans/fetchPlans", async (_, { rejectWithValue }) => {
  try {
    return await apiClient<PlanT[]>('/plans');
  } catch (err) {
    return rejectWithValue(err);
  }
});
