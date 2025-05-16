import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { TastingT } from "@/schemas/tastings";
import type { FetchStatusT, MessageT } from "@/types";
import type { RootState } from "@/data/store";
import { createTastingThunk, deleteTastingThunk, editTastingThunk, fetchTastingsThunk } from "@/api/tasting";

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
        const tastingList = action.payload.map((tasting) => {
          const price = typeof tasting.price === "string" ? Number.parseFloat(tasting.price) : tasting.price;

          const data: TastingT = {
            ...tasting,
            price: typeof price === "number" ? price : 0.0,
            date: new Date(tasting.date),
            imageUrl: tasting.imageUrl ?? "",
            name: tasting.name ?? "",
            purchaseLocation: tasting.purchaseLocation ?? "",
            notes: tasting.notes ?? "",
            wouldBuyAgain: tasting.wouldBuyAgain ?? false,
          };

          return data;
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
