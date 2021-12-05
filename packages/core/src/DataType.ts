import ArrayType, { ArrayTypeJSON } from "./ArrayType";
import FunctionType, { FunctionTypeJSON } from "./FunctionType";
import ObjectType, { ObjectTypeJSON } from "./ObjectType";
import { IType } from "./type";

const parseJSON = (
  data: BASE_TYPE | ArrayTypeJSON | ObjectTypeJSON | FunctionTypeJSON
) => {
  if (typeof data === "string") {
    return data;
  }

  if (data._type === "ArrayType") {
    return new ArrayType(data);
  }

  if (data._type === "ObjectType") {
    return new ObjectType(data);
  }

  if (data._type === "FunctionType") {
    return new FunctionType(data);
  }

  throw new Error("Unknown type");
};

const toJSON = (data: BASE_TYPE | ArrayType | ObjectType | FunctionType) => {
  if (typeof data === "string") {
    return data;
  }
  return data.toJSON();
};

class DataType {
  constructor(dataTypeJSON: DataTypeJSON) {
    this._id = dataTypeJSON._id;
    this._name = dataTypeJSON._name;
    this._data = parseJSON(dataTypeJSON._data);
  }

  toJSON(): DataTypeJSON {
    return {
      _id: this._id,
      _name: this._name,
      _data: toJSON(this._data),
    };
  }
}

export default DataType;

interface DataType
  extends IType<BASE_TYPE | ArrayType | ObjectType | FunctionType> {}

export enum BASE_TYPE {
  NUMBER = "NUMBER",
  STRING = "STRING",
  BOOLEAN = "BOOLEAN",
  NULL = "NULL",
  ANY = "ANY",
}

export interface DataTypeJSON
  extends IType<
    BASE_TYPE | ArrayTypeJSON | ObjectTypeJSON | FunctionTypeJSON
  > {}
