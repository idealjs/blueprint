import DataType, { DataTypeJSON } from "./DataType";
import { IType } from "./type";

class ArrayType {
  constructor(arrayTypeJSON: ArrayTypeJSON) {
    this._id = arrayTypeJSON._id;
    this._name = arrayTypeJSON._name;
    this._data = {
      dimension: arrayTypeJSON._data.dimension,
      type: new DataType(arrayTypeJSON._data.type),
    };
  }

  toJSON(): ArrayTypeJSON {
    return {
      _id: this._id,
      _name: this._name,
      _type: "ArrayType",
      _data: {
        dimension: this._data.dimension,
        type: this._data.type.toJSON(),
      },
    };
  }
}

export default ArrayType;

interface ArrayType
  extends IType<{
    dimension: number;
    type: DataType;
  }> {}

export interface ArrayTypeJSON
  extends IType<{
    dimension: number;
    type: DataTypeJSON;
  }> {
  _type: "ArrayType";
}
