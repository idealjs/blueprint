import { createSlice } from "@reduxjs/toolkit";

export interface IChessboard {
  x: number;
  y: number;
  k: number;
}

const slice = createSlice({
  name: "chessboard",
  initialState: {
    x: 0,
    y: 0,
    k: 1,
  },
  reducers: {
    set: (state, action: { payload: Partial<IChessboard>; type: string }) => {
      return { ...state, ...action.payload };
    },
  },
});

export default slice.reducer;

export const { set: setChessboard } = slice.actions;
