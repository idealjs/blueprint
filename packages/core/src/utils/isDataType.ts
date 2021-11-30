import { BASE_TYPE, IDataType, IFunctionType } from "../DataType";

export const isDataTypeBaseType = (
  dataType: IDataType
): dataType is {
  id: string;
  name: string;
  type: BASE_TYPE;
  isArray: boolean;
} => {
  if (
    typeof dataType.type === "string" &&
    Object.values(BASE_TYPE).includes(dataType.type)
  ) {
    return true;
  }
  return false;
};

export const isDataTypeFunction = (
  dataType: IDataType
): dataType is {
  id: string;
  name: string;
  type: IFunctionType;
  isArray: boolean;
} => {
  return false;
};

export const isDataTypeComplexType = (
  dataType: IDataType
): dataType is {
  id: string;
  name: string;
  type: Map<string, IDataType>;
  isArray: boolean;
} => {
  return false;
};
