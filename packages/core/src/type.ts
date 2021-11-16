import { IDataType, IFunctionType } from "./DataType";

export const isDataType = (type: any): type is IDataType => {
  return true;
};

export const isFunctionType = (type: any): type is IFunctionType => {
  return true;
};

export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
