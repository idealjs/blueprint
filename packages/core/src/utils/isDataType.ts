import { BASE_TYPE, IDataType, IFunctionType } from "../DataType";

const isDataTypeBaseType = (
  dataType: IDataType
): dataType is {
  id: string;
  name: string;
  type: BASE_TYPE;
  isArray: boolean;
} => {
  return false;
};

const isDataTypeFunction = (
  dataType: IDataType
): dataType is {
  id: string;
  name: string;
  type: IFunctionType;
  isArray: boolean;
} => {
  return false;
};

const isDataTypeComplexType = (
  dataType: IDataType
): dataType is {
  id: string;
  name: string;
  type: Map<string, IDataType>;
  isArray: boolean;
} => {
  return false;
};
