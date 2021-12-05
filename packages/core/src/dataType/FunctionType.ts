import Chessboard from "../chessboard/Chessboard";
import { FunctionTypeJSON } from "../type";
import DataType from "./DataType";

class FunctionType {
  constructor(functionType: FunctionTypeJSON, chessboard: Chessboard) {
    this.value = {
      parameters: functionType.value.parameters.map((parameter) => {
        return DataType.fromJSON(parameter, chessboard);
      }),
      returnType: functionType.value.returnType
        ? DataType.fromJSON(functionType.value.returnType, chessboard)
        : undefined,
    };
  }

  toJSON(): FunctionTypeJSON {
    return {
      value: {
        parameters: this.value.parameters.map((parameter) =>
          parameter.toJSON()
        ),
        returnType: this.value.returnType?.toJSON(),
      },
      _type: "FunctionType",
    };
  }
}

export default FunctionType;

interface FunctionType {
  value: {
    parameters: DataType[];
    returnType?: DataType;
  };
}
