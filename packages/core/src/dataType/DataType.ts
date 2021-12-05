import Chessboard from "../chessboard/Chessboard";
import {
  ArrayTypeJSON,
  BaseTypeJSON,
  DataTypeJSON,
  FunctionTypeJSON,
  IType,
  ObjectTypeJSON,
} from "../type";
import ArrayType from "./ArrayType";
import BaseType from "./BaseType";
import FunctionType from "./FunctionType";
import ObjectType from "./ObjectType";

const parseJSON = (
  data: BaseTypeJSON | ArrayTypeJSON | ObjectTypeJSON | FunctionTypeJSON,
  chessboard: Chessboard
) => {
  if (typeof data === "string") {
    return data;
  }

  if (data._type === "ArrayType") {
    return new ArrayType(data, chessboard);
  }

  if (data._type === "ObjectType") {
    return new ObjectType(data, chessboard);
  }

  if (data._type === "FunctionType") {
    return new FunctionType(data, chessboard);
  }

  throw new Error("Unknown type");
};

class DataType {
  constructor(json: DataTypeJSON, chessboard: Chessboard) {
    this._id = json._id;
    this._name = json._name;
    this._type = parseJSON(json._type, chessboard);
  }

  toJSON(): DataTypeJSON {
    return {
      _id: this._id,
      _name: this._name,
      _type: this._type.toJSON(),
    };
  }

  static fromJSON(json: DataTypeJSON, chessboard: Chessboard) {
    let dataType = chessboard?.dataTypes.find(
      (dataType) => dataType._id === json._id
    );
    if (dataType) {
      return dataType;
    }
    dataType = new DataType(json, chessboard);
    if (chessboard) {
      chessboard.dataTypes.push(dataType);
    }
    return dataType;
  }
}

export default DataType;

interface DataType
  extends IType<BaseType | ArrayType | ObjectType | FunctionType> {}
