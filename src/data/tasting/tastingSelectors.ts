import type { RootState } from "@/data/store";
import { createSelector } from "@reduxjs/toolkit";
import { TastingEnrichedT } from "@/schemas/tastings"
import { INITIAL_REGION_VALUES } from "@/schemas/regions";
import { TagT } from "@/schemas/tags";
import { VarietalT } from "@/schemas/varietals";

export const selectTastingList = (state: RootState) => state.tasting.tastingList;
export const selectRegionList = (state: RootState) => state.region.regionList;
export const selectTagList = (state: RootState) => state.tag.tagList;
export const selectVarietalList = (state: RootState) => state.varietal.varietalList;

export const selectTastingListEnriched = createSelector(
  [selectTastingList, selectRegionList, selectTagList, selectVarietalList],
  (tastings, regions, tags, varietals): TastingEnrichedT[] => {
    return tastings.map((tasting) => {
      const region = regions.find((r) => r.id === tasting.region) || INITIAL_REGION_VALUES;
      const tastingTags = tasting.tags.map((tagId) => tags.find((t) => t.id === tagId)).filter(Boolean) as TagT[];
      const tastingVarietals = tasting.varietals.map((vId) => varietals.find((v) => v.id === vId)).filter(Boolean) as VarietalT[];

      return {
        ...tasting,
        region,
        tags: tastingTags,
        varietals: tastingVarietals,
      };
    });
  }
);

export const selectTastingByIdEnriched = (id: string) =>
  createSelector([selectTastingListEnriched], (tastings) =>
    tastings.find((t) => t.id === id)
  );