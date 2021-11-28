import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

const slice = createSlice<string | null, SliceCaseReducers<string | null>>({
  name: "selectedChessmanId",
  initialState: null,
  reducers: {
    set: (
      state,
      action: {
        payload: string;
      }
    ) => action.payload,
  },
});

export default slice.reducer;

export const { set: setSelectedChessmanId } = slice.actions;
