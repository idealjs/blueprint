import { BASE_TYPE, DataTypeJSON, PartialRecord } from "@idealjs/blueprint";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

export const dataTypesAdapter = createEntityAdapter<DataTypeJSON>({
  selectId: (datatype) => datatype._id,
});

export const initialDataTypes: DataTypeJSON[] = Object.entries(BASE_TYPE).map(
  (entry) => {
    return {
      _id: entry[0],
      _name: entry[0],
      _type: {
        value: entry[1],
        _type: "BaseType",
      },
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
    add: dataTypesAdapter.addOne,
    remove: dataTypesAdapter.removeOne,
    update: dataTypesAdapter.updateOne,
    upsert: dataTypesAdapter.upsertOne,
  },
});

export default slice.reducer;

export const {
  add: addDataType,
  upsert: upsertDataType,
  remove: removeDataType,
  update: updateDataType,
} = slice.actions;

export const dataTypesSelector = dataTypesAdapter.getSelectors<RootState>(
  (state) => state.dataTypes
);

export interface IFunctionTypeState {
  _params: PartialRecord<number, DataTypeJSON>;
  _returnType?: DataTypeJSON;
}

export const isDataTypeBaseType = (
  dataType: DataTypeJSON
): dataType is DataTypeJSON => {
  return dataType._type._type === "BaseType";
};

export const isDataTypeArrayType = (
  dataType: DataTypeJSON
): dataType is DataTypeJSON => {
  return dataType._type._type === "ArrayType";
};

export const isDataTypeObjectType = (
  dataType: DataTypeJSON
): dataType is DataTypeJSON => {
  return dataType._type._type === "ObjectType";
};

export const isDataTypeFunctionType = (
  dataType: DataTypeJSON
): dataType is DataTypeJSON => {
  return dataType._type._type === "FunctionType";
};
