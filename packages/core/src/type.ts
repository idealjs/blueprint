export interface FunctionType {
  params: Map<number, DataType | FunctionType>;
  returnType: DataType | FunctionType;
}

export interface DataType {
  id: string;
  type: BASE_TYPE | Map<string, DataType | FunctionType>;
}

export enum BASE_TYPE {
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  NULL = "NULL",
}

export const isDataType = (type: any): type is DataType => {
  return true;
};

export const isFunctionType = (type: any): type is FunctionType => {
  return true;
};
