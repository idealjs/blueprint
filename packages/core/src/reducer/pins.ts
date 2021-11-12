import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

export enum PIN_DIRECTION {
  OUT = "OUT",
  IN = "IN",
}

export interface IPin {
  id: string;
  type: PIN_DIRECTION;
  x: number;
  y: number;
  to?: {
    pinId: string;
  };
  parentId: string;
}

export const pinsAdapter = createEntityAdapter<IPin>({
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
