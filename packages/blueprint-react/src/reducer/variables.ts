import { VariableJSON } from "@idealjs/blueprint";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

export const variablesAdapter = createEntityAdapter<VariableJSON>();

const slice = createSlice({
  name: "variables",
  initialState: variablesAdapter.getInitialState(),
  reducers: {
    add: variablesAdapter.addOne,
    upsert: variablesAdapter.upsertOne,
    remove: variablesAdapter.removeOne,
    update: variablesAdapter.updateOne,
  },
});

export default slice.reducer;

export const {
  add: addVariable,
  upsert: upsertVariable,
  remove: removeVariable,
  update: updateVariable,
} = slice.actions;

export const variablesSelector = variablesAdapter.getSelectors<RootState>(
  (state) => state.variables
);
