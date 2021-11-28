import DataTypeManager from "./DataTypeManager";

class DataType implements IDataType {
  public id: string;
  public type: BASE_TYPE | IFunctionType | Map<string, DataType>;
  public isArray: boolean;
  constructor(dataTypeManager: DataTypeManager, dataType: IDataType) {
    this.id = dataType.id;
    this.isArray = dataType.isArray;
    if (dataType.type instanceof Map) {
      let type = new Map<string, DataType>();
      dataType.type.forEach((value, key: string) => {
        type.set(key, DataType.fromJSON(dataTypeManager, value));
      });
      this.type = type;
    } else {
      this.type = dataType.type;
    }
  }

  static fromJSON(dataTypeManager: DataTypeManager, dataType: IDataType) {
    const d = dataTypeManager.dataTypeMap.get(dataType.id);
    if (d != null) {
      return d;
    }
    return new DataType(dataTypeManager, dataType);
  }

  toJSON(): IDataType {
    if (this.type instanceof Map) {
      const type = new Map<string, IDataType>();
      this.type.forEach((value, key: string) => {
        type.set(key, value.toJSON());
      });
      return {
        id: this.id,
        type,
        isArray: this.isArray,
      };
    }

    return {
      id: this.id,
      type: this.type,
      isArray: this.isArray,
    };
  }
}

export default DataType;

export interface IDataType {
  id: string;
  type: BASE_TYPE | IFunctionType | Map<string, IDataType>;
  isArray: boolean;
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
