
import { createSlice } from "@reduxjs/toolkit";

import { fetchRegions } from "@/api/region";
import type { RegionT } from "@/schemas/regions";
import type { FetchStatusT, MessageT } from "@/types";

export interface InitialRegionState {
  message: MessageT;
  status: FetchStatusT;
  regionList: RegionT[];
  regionsLoaded: boolean;
}

const initialState: InitialRegionState = {
  message: null,
  status: "idle",
  regionList: [],
  regionsLoaded: false,
};

export const regionSlice = createSlice({
  name: "region",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRegions.fulfilled, (state, action) => {
      const regionList = action.payload.map((region) => {
        return {
          ...region,
        } as RegionT;
      });

      state.regionList = regionList;
      state.regionsLoaded = true;
    })
  },
});

export default regionSlice.reducer;

