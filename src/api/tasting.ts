import { RootState } from "@/data/store";
import { dc } from "@/database";
import { TastingT } from "@/schemas/tastings";
import { Account_Key, createTasting, CreateTastingVariables, deleteTasting, DeleteTastingVariables, listTastings, ListTastingsResponse, ListTastingsVariables, updateTasting, UpdateTastingVariables } from "@firebasegen/somm-scribe-connector";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface FetchTastingsParams {
    accountId: string;
    previousDoc?: string;
  }
  
  export const fetchTastingsThunk = createAsyncThunk<
    ListTastingsResponse,
    FetchTastingsParams,
    {
      state: RootState;
    }
  >("tasting/fetchTastings", async ({ accountId }, { rejectWithValue }) => {
    try {
      const params: ListTastingsVariables = { accountId };
      const { data } = await listTastings(params);
  
      return data;
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
      const account = { id: request.accountId } as unknown;
      const {
        tags,
        varietals,
        name,
        notes,
        date,
        region,
        rating,
      } = request;
  
      const createdAt = new Date();
  
      const tastingData: CreateTastingVariables = {
        name,
        tags,
        notes,
        varietals,
        account: account as Account_Key,
        date: date.toISOString(),
        price,
        region,
        rating,
        createdAt: createdAt.toISOString(),
      };
      const { data } = await createTasting(dc, { ...tastingData });
  
      const tasting = {
        ...request,
        id: data.tasting_insert.id,
      };
      return tasting as TastingT;
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
      region,
      rating,
    } = data;
    try {
      const updatedAt = new Date();
      const request: UpdateTastingVariables = {
        id,
        date: date.toISOString(),
        region,
        price,
        rating,
        updatedAt: updatedAt.toISOString(),
      };
      await updateTasting(request);
      return data;
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
      const request: DeleteTastingVariables = {
        id,
      };
      await deleteTasting(request);
      return id;
    } catch (err) {
      return rejectWithValue(err);
    }
  });
  