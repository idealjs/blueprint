import Chessboard from "../chessboard/Chessboard";
import DataType from "../dataType/DataType";
import { DataTypeJSON } from "../type";

class Variable {
  private chessboard?: Chessboard;

  constructor(json: VariableJSON, chessboard: Chessboard) {
    this.chessboard = chessboard;
    this.id = json.id;
    this.dataType = DataType.fromJSON(json.dataType, chessboard);
  }

  toJSON(): VariableJSON {
    return {
      id: this.id,
      dataType: this.dataType.toJSON(),
    };
  }

  fromJSON(json: VariableJSON, chessboard: Chessboard): Variable {
    let variable = chessboard.variables.find((v) => v.id === json.id);
    if (variable) {
      return variable;
    }
    variable = new Variable(json, chessboard);

    chessboard.variables.push(variable);

    return variable;
  }
}

export default Variable;

interface Variable {
  id: string;
  dataType: DataType;
}

export interface VariableJSON {
  id: string;
  dataType: DataTypeJSON;
}
