import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { RootState } from ".";

export enum CHESSMAN_TYPE {
  START = "START",
  VARIABLE = "VARIABLE",
  FUNCTION = "FUNCTION",
}

export interface IChessman {
  id: string;
  type: CHESSMAN_TYPE;
  x: number;
  y: number;
  width: number;
  height: number;
  pins: string[];
}

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
