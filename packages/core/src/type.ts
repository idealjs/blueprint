export interface IDataType {
  id: string;
  type: BASE_TYPE | IFunctionType | Map<string, IDataType>;
}

export interface IFunctionType {
  params: Map<number, IDataType | IFunctionType>;
  returnType: IDataType | IFunctionType;
}

export enum BASE_TYPE {
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  NULL = "NULL",
}

export const isDataType = (type: any): type is IDataType => {
  return true;
};

export const isIFunctionType = (type: any): type is IFunctionType => {
  return true;
};

export type RequiredBy<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;
