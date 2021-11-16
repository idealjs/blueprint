class DataType implements IDataType {
  public id: string;
  public type: BASE_TYPE | IFunctionType | Map<string, DataType>;
  constructor(dataTypeMap: Map<string, DataType>, dataType: IDataType) {
    this.id = dataType.id;
    if (dataType.type instanceof Map) {
      let type = new Map<string, DataType>();
      dataType.type.forEach((value, key: string) => {
        type.set(key, new DataType(dataTypeMap, value));
      });
      this.type = type;
    } else {
      this.type = dataType.type;
    }
  }
  toJSON(): IDataType {
    if (this.type instanceof Map) {
      let type = new Map<string, IDataType>();
      this.type.forEach((value, key: string) => {
        type.set(key, value.toJSON());
      });
      return {
        id: this.id,
        type,
      };
    }
    return {
      id: this.id,
      type: this.type,
    };
  }
}

export default DataType;

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
