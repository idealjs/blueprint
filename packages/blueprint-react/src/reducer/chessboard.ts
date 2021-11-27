import { IChessboard } from "@idealjs/blueprint";
import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

const slice = createSlice<IChessboard, SliceCaseReducers<IChessboard>, string>({
  name: "chessboard",
  initialState: {
    x: 0,
    y: 0,
    k: 1,
    chessmanMap: new Map(),
    pinMap: new Map(),
  },
  reducers: {
    update: (
      state,
      action: { payload: Partial<IChessboard>; type: string }
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export default slice.reducer;

export const { update: updateChessboard } = slice.actions;
