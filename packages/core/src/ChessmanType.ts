import DataType, { IDataType } from "./DataType";
import DataTypeManager from "./DataTypeManager";

class ChessmanType {
  public isArray: boolean;
  public dataType: DataType;
  constructor(dataTypeManager: DataTypeManager, chessmanType: IChessmanType) {
    this.isArray = chessmanType.isArray;
    this.dataType = DataType.fromJSON(dataTypeManager, chessmanType.dataType);
  }

  toJSON(): IChessmanType {
    return {
      isArray: this.isArray,
      dataType: this.dataType,
    };
  }
}

export default ChessmanType;

export interface IChessmanType {
  isArray: boolean;
  dataType: IDataType;
}
