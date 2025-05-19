
import { createSlice } from "@reduxjs/toolkit";

import { fetchTags } from "@/api/tag";
import type { TagT } from "@/schemas/tags";
import type { FetchStatusT, MessageT } from "@/types";

export interface InitialTagState {
  message: MessageT;
  status: FetchStatusT;
  tagList: TagT[];
  tagsLoaded: boolean;
}

const initialState: InitialTagState = {
  message: null,
  status: "idle",
  tagList: [],
  tagsLoaded: false,
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      const tagList = action.payload.map((tag) => {
        return {
          ...tag,
        } as TagT;
      });

      state.tagList = tagList;
      state.tagsLoaded = true;
    })
  },
});

export default tagSlice.reducer;

