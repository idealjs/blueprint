import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

export interface ITag {
  id: string;
}

export const tagsAdapter = createEntityAdapter<ITag>({
  selectId: (i) => i.id,
});

const slice = createSlice({
  name: "tag",
  initialState: tagsAdapter.getInitialState(),
  reducers: {
    add: tagsAdapter.addOne,
    remove: tagsAdapter.removeOne,
    update: tagsAdapter.updateOne,
  },
});

export default slice.reducer;

export const {
  add: addTag,
  remove: removeTag,
  update: updateTag,
} = slice.actions;

export const tagsSelector = tagsAdapter.getSelectors<RootState>(
  (state) => state.tags
);
