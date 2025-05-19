import { RootState } from "@/data/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "./client";
import { VarietalT } from "@/schemas/varietals";

export const fetchVarietals = createAsyncThunk<
  VarietalT[],
  void,
  {
    state: RootState;
  }
>("varietal/fetchVarietals", async (_, { rejectWithValue }) => {
  try {
    return await apiClient<VarietalT[]>('/varietals');
  } catch (err) {
    return rejectWithValue(err);
  }
});
