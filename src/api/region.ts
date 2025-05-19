import { RootState } from "@/data/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "./client";
import { RegionT } from "@/schemas/regions";

export const fetchRegions = createAsyncThunk<
  RegionT[],
  void,
  {
    state: RootState;
  }
>("region/fetchRegions", async (_, { rejectWithValue }) => {
  try {
    return await apiClient<RegionT[]>('/regions');
  } catch (err) {
    return rejectWithValue(err);
  }
});
