import DataType, { IDataType } from "./DataType";

class DataTypeManager {
  public dataTypeMap = new Map<string, DataType>();

  constructor(dataTypeManager?: IDataTypeManager) {
    dataTypeManager?.dataTypeMap.forEach((dataType, key) => {
      this.dataTypeMap.set(key, DataType.fromJSON(this, dataType));
    });
  }

  toJSON(): IDataTypeManager {
    const dataTypeMap = new Map<string, IDataType>();
    this.dataTypeMap.forEach((dataType, key) => {
      dataTypeMap.set(key, dataType.toJSON());
    });
    return {
      dataTypeMap,
    };
  }
}
export default DataTypeManager;

interface IDataTypeManager {
  dataTypeMap: Map<string, IDataType>;
}
