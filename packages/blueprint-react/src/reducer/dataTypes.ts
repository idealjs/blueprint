import { BASE_TYPE, IDataType, PartialRecord } from "@idealjs/blueprint";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

export const dataTypesAdapter = createEntityAdapter<IDataTypeState>({
  selectId: (datatype) => datatype.id,
});

export const initialDataTypes: IDataTypeState[] = Object.entries(BASE_TYPE).map(
  (entry) => {
    return {
      isArray: false,
      id: entry[0],
      name: entry[0],
      type: entry[1],
    };
  }
);

const slice = createSlice({
  name: "dataType",
  initialState: dataTypesAdapter.addMany(
    dataTypesAdapter.getInitialState(),
    initialDataTypes
  ),
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

export interface IDataTypeState
  extends Pick<IDataType, "id" | "name" | "isArray"> {
  type: BASE_TYPE | IFunctionTypeState | PartialRecord<string, IDataTypeState>;
}

export interface IFunctionTypeState {
  params: PartialRecord<number, IDataTypeState>;
  returnType?: IDataTypeState;
}
