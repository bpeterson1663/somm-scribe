import { dc } from "@/database";
import type { WineT } from "@/schemas/cellar";
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
  tastingOpen: WineT | null;
  publicTastingList: TastingT[];
}
const initialState: InitialTastingState = {
  message: null,
  status: "idle",
  tastingList: [],
  tasting: null,
  tastingOpen: null,
  publicTastingList: [],
};

export const tastingSlice = createSlice({
  name: "tasting",
  initialState,
  reducers: {
    tastingSetEdit: (state, action: PayloadAction<TastingT>) => {
      state.tasting = action.payload;
    },
    tastingSetOpen: (state, action: PayloadAction<WineT | null>) => {
      state.tastingOpen = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTastingsThunk.fulfilled, (state, action) => {
        const tastingList = action.payload.tastings.map((tasting) => {
          const quantity = typeof tasting.quantity === "string" ? Number.parseInt(tasting.quantity) : tasting.quantity;
          const price = typeof tasting.price === "string" ? Number.parseFloat(tasting.price) : tasting.price;

          const data = {
            ...tasting,
            quantity: typeof quantity === "number" ? quantity : 0,
            price: typeof price === "number" ? price : 0.0,
            date: new Date(tasting.date),
            labelUri: tasting.labelUri ?? "",
            description: tasting.description ?? "",
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

export const { tastingSetEdit, tastingSetOpen } = tastingSlice.actions;

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
  const quantity = typeof request.quantity === "string" ? Number.parseInt(request.quantity) : request.quantity;
  const price = typeof request.price === "string" ? Number.parseFloat(request.price) : request.price;
  try {
    const account = { id: request.accountId } as unknown;
    const {
      classification,
      country,
      date,
      description,
      labelUri,
      producer,
      region,
      subregion,
      varietal,
      vintage,
      hue,
      color,
      intensity,
      smell,
      alcohol,
      acidity,
      tannin,
      sweet,
      body,
      rating,
      remarks,
    } = request;
    const tastingData = {
      account: account as Account_Key,
      classification,
      country,
      date: date.toISOString(),
      description,
      labelUri,
      producer,
      price,
      region,
      subregion,
      varietal,
      vintage,
      quantity,
      hue,
      color,
      intensity,
      smell,
      alcohol,
      acidity,
      tannin,
      sweet,
      body,
      rating,
      remarks,
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
  const quantity = typeof data.quantity === "string" ? Number.parseInt(data.quantity) : data.quantity;
  const price = typeof data.price === "string" ? Number.parseFloat(data.price) : data.price;
  const {
    id,
    classification,
    country,
    date,
    description,
    labelUri,
    producer,
    region,
    subregion,
    varietal,
    vintage,
    hue,
    color,
    intensity,
    smell,
    alcohol,
    acidity,
    tannin,
    sweet,
    body,
    rating,
    remarks,
  } = data;
  try {
    delete data.imageBlob;
    const request: UpdateTastingVariables = {
      id,
      classification,
      country,
      description,
      date: date.toISOString(),
      labelUri,
      producer,
      region,
      subregion,
      varietal,
      vintage,
      quantity,
      price,
      hue,
      color,
      intensity,
      smell,
      alcohol,
      acidity,
      tannin,
      sweet,
      body,
      rating,
      remarks,
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
