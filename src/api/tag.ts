import { RootState } from "@/data/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "./client";
import { TagT } from "@/schemas/tags";

export const fetchTags = createAsyncThunk<
  TagT[],
  void,
  {
    state: RootState;
  }
>("tag/fetchTags", async (_, { rejectWithValue }) => {
  try {
    return await apiClient<TagT[]>('/tags');
  } catch (err) {
    return rejectWithValue(err);
  }
});
