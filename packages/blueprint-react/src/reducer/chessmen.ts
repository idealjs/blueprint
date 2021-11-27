import { IChessman } from "@idealjs/blueprint";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

export const chessmenAdapter = createEntityAdapter<IChessman>({
  selectId: (chessman) => chessman.id,
  sortComparer: () => 0,
});

const slice = createSlice({
  name: "chessman",
  initialState: chessmenAdapter.getInitialState(),
  reducers: {
    add: chessmenAdapter.addOne,
    remove: chessmenAdapter.removeOne,
    update: chessmenAdapter.updateOne,
  },
});

export default slice.reducer;

export const {
  add: addChessman,
  remove: removeChessman,
  update: updateChessman,
} = slice.actions;

export const chessmenSelector = chessmenAdapter.getSelectors<RootState>(
  (state) => state.chessmen
);
