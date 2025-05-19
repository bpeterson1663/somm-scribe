import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/data/store";

export const selectRegions = (state: RootState) => state.region.regionList;

export const selectRegionById = (id: string) =>
  createSelector(
    [selectRegions],
    (regions) => regions.find((region) => region.id === id)
  );