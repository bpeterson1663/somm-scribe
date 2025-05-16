import { RootState } from "@/data/store";
import { TastingT } from "@/schemas/tastings";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApiClient } from "./client";

export const fetchTastingsThunk = createAsyncThunk<
  TastingT[],
  void,
  {
    state: RootState;
  }
>("tasting/fetchTastings", async (_, { rejectWithValue }) => {
  try {
    return await authApiClient<TastingT[]>('/tastings');
  } catch (err) {
    console.error(err);
    return rejectWithValue(err);
  }
});

export const createTastingThunk = createAsyncThunk<
  TastingT,
  TastingT,
  {
    state: RootState;
  }
>("tasting/createTasting", async (request, { rejectWithValue }) => {
  const price = typeof request.price === "string" ? Number.parseFloat(request.price) : request.price;
  try {
    const {
      tags,
      varietals,
      name,
      notes,
      date,
      region,
      rating,
    } = request;

    const body = JSON.stringify({
      name,
      tags,
      notes,
      varietals,
      date: date.toISOString(),
      price,
      region,
      rating,
    });

    return await authApiClient<TastingT>('/tastings', {
      method: "POST",
      body,
    });
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const editTastingThunk = createAsyncThunk<
  TastingT,
  TastingT,
  {
    state: RootState;
  }
>("tasting/editTasting", async (data, { rejectWithValue }) => {
  const price = typeof data.price === "string" ? Number.parseFloat(data.price) : data.price;
  const {
    id,
    date,
    name,
    region,
    rating,
    varietals,
    tags,
    notes
  } = data;

  const body = JSON.stringify({
    name,
    tags,
    notes,
    varietals,
    date: date.toISOString(),
    price,
    region,
    rating,  
  })

  try {
    return await authApiClient(`/tastings/${id}`, {
      method: "PATCH",
      body
    })
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const deleteTastingThunk = createAsyncThunk<
  string,
  string,
  {
    state: RootState;
  }
>("tasting/deleteTasting", async (id, { rejectWithValue }) => {
  try {
    return await authApiClient(`/tastings/${id}`, {
      method: "DELETE",
    })
  } catch (err) {
    return rejectWithValue(err);
  }
});
