import { IPin } from "@idealjs/blueprint";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

export const pinsAdapter = createEntityAdapter<IPinState>({
  selectId: (pin) => pin.id,
});

const slice = createSlice({
  name: "pin",
  initialState: pinsAdapter.getInitialState(),
  reducers: {
    add: pinsAdapter.addOne,
    addMany: pinsAdapter.addMany,
    remove: pinsAdapter.removeOne,
    update: pinsAdapter.updateOne,
    updateMany: pinsAdapter.updateMany,
  },
});

export default slice.reducer;

export const {
  add: addPin,
  addMany: addManyPin,
  remove: removePin,
  update: updatePin,
  updateMany: updateManyPin,
} = slice.actions;

export const pinsSelector = pinsAdapter.getSelectors<RootState>(
  (state) => state.pins
);

export interface IPinState extends Pick<IPin, "id" | "x" | "y" | "type"> {
  dataTypeId: string;
  parentId: string;
  connectedIds: string[];
}
