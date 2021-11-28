import { BASE_TYPE, IDataType, PartialRecord } from "@idealjs/blueprint";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

export const dataTypesAdapter = createEntityAdapter<IDataTypeState>({
  selectId: (datatype) => datatype.id,
  sortComparer: () => 0,
});

const slice = createSlice({
  name: "dataType",
  initialState: dataTypesAdapter.getInitialState(),
  reducers: {
    remove: dataTypesAdapter.removeOne,
    update: dataTypesAdapter.updateOne,
    upsert: dataTypesAdapter.upsertOne,
  },
});

export default slice.reducer;

export const {
  upsert: upsertDataType,
  remove: removeDataType,
  update: updateDataType,
} = slice.actions;

export const datatypesSelector = dataTypesAdapter.getSelectors<RootState>(
  (state) => state.dataTypes
);

export interface IDataTypeState extends Pick<IDataType, "id" | "isArray"> {
  type: BASE_TYPE | IFunctionTypeState | PartialRecord<string, IDataTypeState>;
}

export interface IFunctionTypeState {
  params?: PartialRecord<number, IDataTypeState>;
  returnType?: IDataTypeState;
}
