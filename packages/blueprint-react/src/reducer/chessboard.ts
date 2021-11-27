import { IChessboard } from "@idealjs/blueprint";
import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

const slice = createSlice<
  IChessboardState,
  SliceCaseReducers<IChessboardState>,
  string
>({
  name: "chessboard",
  initialState: {
    x: 0,
    y: 0,
    k: 1,
  },
  reducers: {
    update: (
      state,
      action: { payload: Partial<IChessboardState>; type: string }
    ) => {
      return { ...state, ...action.payload };
    },
  },
});

export default slice.reducer;

export const { update: updateChessboard } = slice.actions;

export interface IChessboardState extends Pick<IChessboard, "x" | "y" | "k"> {}
