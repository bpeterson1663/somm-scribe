import { dc } from "@/database";
import type { RootState } from "@/features/store";
import type { WineT } from "@/schemas/cellar";
import type { FetchStatusT, MessageT } from "@/types";
import {
  type Account_Key,
  type DeleteWineVariables,
  type ListWinesResponse,
  type ListWinesVariables,
  type UpdateWineVariables,
  createWine,
  deleteWine,
  listWines,
  updateWine,
} from "@firebasegen/somm-scribe-connector";
import { type PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface InitialCellarState {
  message: MessageT;
  status: FetchStatusT;
  wineList: WineT[];
  wine: WineT | null;
}
const initialState: InitialCellarState = {
  message: null,
  status: "idle",
  wineList: [],
  wine: null,
};

export const cellarSlice = createSlice({
  name: "cellar",
  initialState,
  reducers: {
    wineSetEdit: (state, action: PayloadAction<WineT>) => {
      state.wine = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWinesThunk.fulfilled, (state, action) => {
        const wineList = action.payload.wines.map((wine) => {
          const quantity = typeof wine.quantity === "string" ? Number.parseInt(wine.quantity) : wine.quantity;
          const price = typeof wine.price === "string" ? Number.parseFloat(wine.price) : wine.price;

          const data = {
            ...wine,
            date: new Date(wine.date),
            quantity,
            price,
            type: "wine",
          } as unknown;
          return data as WineT;
        });
        state.wineList = wineList;
      })
      .addCase(createWineThunk.fulfilled, (state, action) => {
        const wines = [...state.wineList, action.payload];
        state.wineList = wines;
      })
      .addCase(editWineThunk.fulfilled, (state, action) => {
        const index = state.wineList.findIndex((el) => el.id === action.payload.id);
        if (index >= 0) {
          state.wineList[index] = action.payload;
        }
      })
      .addCase(deleteWineThunk.fulfilled, (state, action) => {
        state.wineList = state.wineList.filter((wine) => wine.id !== action.payload);
      });
  },
});

export const { wineSetEdit } = cellarSlice.actions;

export const wineListSelector = (state: RootState) => state.cellar;

export default cellarSlice.reducer;

interface FetchWinesParams {
  accountId: string;
  previousDoc?: string;
}

export const fetchWinesThunk = createAsyncThunk<
  ListWinesResponse,
  FetchWinesParams,
  {
    state: RootState;
  }
>("wine/fetchWines", async ({ accountId }, { rejectWithValue }) => {
  try {
    const params: ListWinesVariables = { accountId };
    const { data } = await listWines(params);
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const createWineThunk = createAsyncThunk<
  WineT,
  WineT,
  {
    state: RootState;
  }
>("wine/createWine", async (request, { rejectWithValue }) => {
  const quantity = typeof request.quantity === "string" ? Number.parseInt(request.quantity) : request.quantity;
  const price = typeof request.price === "string" ? Number.parseFloat(request.price) : request.price;
  try {
    const accountId = request.accountId as unknown;
    const { classification, country, date, description, labelUri, producer, region, subregion, varietal, vintage } =
      request;

    const wineData = {
      account: accountId as Account_Key,
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
    };
    const { data } = await createWine(dc, { ...wineData });

    const wine = {
      ...request,
      id: data.wine_insert.id,
    };

    return wine as WineT;
  } catch (err) {
    console.error({ err });
    return rejectWithValue(err);
  }
});

export const editWineThunk = createAsyncThunk<
  WineT,
  WineT,
  {
    state: RootState;
  }
>("wine/editWine", async (data, { rejectWithValue }) => {
  const quantity = typeof data.quantity === "string" ? Number.parseInt(data.quantity) : data.quantity;
  const price = typeof data.price === "string" ? Number.parseFloat(data.price) : data.price;
  const { id, classification, country, date, description, labelUri, producer, region, subregion, varietal, vintage } =
    data;

  try {
    delete data.imageBlob;
    const request: UpdateWineVariables = {
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
    };
    await updateWine(request);
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const deleteWineThunk = createAsyncThunk<
  string,
  string,
  {
    state: RootState;
  }
>("wine/deleteWine", async (id, { rejectWithValue }) => {
  try {
    const request: DeleteWineVariables = {
      id,
    };
    await deleteWine(request);
    return id;
  } catch (err) {
    return rejectWithValue(err);
  }
});
