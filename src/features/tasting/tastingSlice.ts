import { dc } from "@/database";
import type { TastingT } from "@/schemas/tastings";
import type { FetchStatusT, MessageT } from "@/types";
import { type PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import {
  type Account_Key,
  type DeleteTastingVariables,
  type ListTastingsResponse,
  type ListTastingsVariables,
  type UpdateTastingVariables,
  createTasting,
  deleteTasting,
  listTastings,
  updateTasting,
} from "@firebasegen/somm-scribe-connector";
interface InitialTastingState {
  message: MessageT;
  status: FetchStatusT;
  tastingList: TastingT[];
  tasting: TastingT | null;
  publicTastingList: TastingT[];
}
const initialState: InitialTastingState = {
  message: null,
  status: "idle",
  tastingList: [],
  tasting: null,
  publicTastingList: [],
};

export const tastingSlice = createSlice({
  name: "tasting",
  initialState,
  reducers: {
    tastingSetEdit: (state, action: PayloadAction<TastingT>) => {
      state.tasting = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTastingsThunk.fulfilled, (state, action) => {
        const tastingList = action.payload.tastings.map((tasting) => {
          const price = typeof tasting.price === "string" ? Number.parseFloat(tasting.price) : tasting.price;

          const data = {
            ...tasting,
            price: typeof price === "number" ? price : 0.0,
            date: new Date(tasting.date),
            labelUri: tasting.imageUrl ?? "",
            name: tasting.name ?? "",
            type: "tasting",
          } as unknown;

          return data as TastingT;
        });

        state.tastingList = tastingList;
      })
      .addCase(createTastingThunk.fulfilled, (state, action) => {
        const tastings = [...state.tastingList, action.payload];
        state.tastingList = tastings;
      })
      .addCase(editTastingThunk.fulfilled, (state, action) => {
        const index = state.tastingList.findIndex((el) => el.id === action.payload.id);
        if (index >= 0) {
          state.tastingList[index] = action.payload;
        }
      })
      .addCase(deleteTastingThunk.fulfilled, (state, action) => {
        state.tastingList = state.tastingList.filter((tasting) => tasting.id !== action.payload);
      });
  },
});

export const { tastingSetEdit } = tastingSlice.actions;

export const tastingListSelector = (state: RootState) => state.tasting;

export default tastingSlice.reducer;

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
    const tastingData = {
      name,
      tags,
      notes,
      varietals,
      account: account as Account_Key,
      date: date.toISOString(),
      price,
      region,
      rating,
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
    const request: UpdateTastingVariables = {
      id,
      date: date.toISOString(),
      region,
      price,
      rating,
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
