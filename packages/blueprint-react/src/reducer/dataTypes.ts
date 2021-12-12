import {
  ArrayTypeJSON,
  BASE_TYPE,
  BaseTypeJSON,
  DataTypeJSON,
  FunctionTypeJSON,
  ObjectTypeJSON,
  PartialRecord,
} from "@idealjs/blueprint";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";

export const dataTypesAdapter = createEntityAdapter<IDataTypeState>({
  selectId: (datatype) => datatype._id,
});

export const initialDataTypes: IDataTypeState[] = Object.entries(BASE_TYPE).map(
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

export interface IDataTypeState<
  T extends BaseTypeJSON | ArrayTypeJSON | ObjectTypeJSON | FunctionTypeJSON =
    | BaseTypeJSON
    | ArrayTypeJSON
    | ObjectTypeJSON
    | FunctionTypeJSON
> extends Pick<DataTypeJSON, "_id" | "_name"> {
  _type: T;
}

export interface IFunctionTypeState {
  _params: PartialRecord<number, IDataTypeState>;
  _returnType?: IDataTypeState;
}

export const isDataTypeBaseType = (
  dataType: IDataTypeState
): dataType is IDataTypeState<BaseTypeJSON> => {
  return dataType._type._type === "BaseType";
};

export const isDataTypeArrayType = (
  dataType: IDataTypeState
): dataType is IDataTypeState<ArrayTypeJSON> => {
  return dataType._type._type === "ArrayType";
};

export const isDataTypeObjectType = (
  dataType: IDataTypeState
): dataType is IDataTypeState<ObjectTypeJSON> => {
  return dataType._type._type === "ObjectType";
};

export const isDataTypeFunctionType = (
  dataType: IDataTypeState
): dataType is IDataTypeState<FunctionTypeJSON> => {
  return dataType._type._type === "FunctionType";
};
