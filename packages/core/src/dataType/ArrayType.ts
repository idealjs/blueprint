import Chessboard from "../chessboard/Chessboard";
import { ArrayTypeJSON } from "../type";
import DataType from "./DataType";

class ArrayType {
  constructor(json: ArrayTypeJSON, chessboard: Chessboard) {
    this.dimension = json.value.dimension;
    this.type = DataType.fromJSON(json.value.type, chessboard);
  }

  toJSON(): ArrayTypeJSON {
    return {
      value: {
        dimension: this.dimension,
        type: this.type.toJSON(),
      },
      _type: "ArrayType",
    };
  }
}

export default ArrayType;

interface ArrayType {
  dimension: number;
  type: DataType;
}
