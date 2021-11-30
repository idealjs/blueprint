import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";

const slice = createSlice<string | null, SliceCaseReducers<string | null>>({
  name: "selectedVariableId",
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

export const { set: setSelectedVariableId } = slice.actions;
