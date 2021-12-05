import DataType, { DataTypeJSON } from "./DataType";
import { IType } from "./type";

class FunctionType {
  constructor(functionType: FunctionTypeJSON) {
    this._id = functionType._id;
    this._name = functionType._name;
    this._data = {
      parameters: functionType._data.parameters.map((parameter) => {
        return new DataType(parameter);
      }),
      returnType: functionType._data.returnType
        ? new DataType(functionType._data.returnType)
        : undefined,
    };
  }

  toJSON(): FunctionTypeJSON {
    return {
      _id: this._id,
      _name: this._name,
      _type: "FunctionType",
      _data: {
        parameters: this._data.parameters.map((parameter) =>
          parameter.toJSON()
        ),
        returnType: this._data.returnType?.toJSON(),
      },
    };
  }
}

export default FunctionType;

interface FunctionType
  extends IType<{
    parameters: DataType[];
    returnType?: DataType;
  }> {}

export interface FunctionTypeJSON
  extends IType<{
    parameters: DataTypeJSON[];
    returnType?: DataTypeJSON;
  }> {
  _type: "FunctionType";
}
