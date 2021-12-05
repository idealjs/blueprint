import DataType from "../dataType/DataType";
import { DataTypeJSON } from "../type";
import Variable, { VariableJSON } from "../variable/Variable";
import Chessman, { ChessmanJSON } from "./Chessman";
import Pin, { PinJSON } from "./Pin";

class Chessboard {
  public x: number = 0;
  public y: number = 0;
  public k: number = 1;
  public chessmen: Chessman[] = [];
  public pins: Pin[] = [];
  public dataTypes: DataType[] = [];
  public variables: Variable[] = [];

  constructor(json?: ChessboardJSON) {
    if (json) {
      this.x = json.x;
      this.y = json.y;
      this.k = json.k;
      this.chessmen = json.chessmen.map(
        (chessmanJSON) => new Chessman(chessmanJSON, this)
      );
      this.pins = json.pins.map((pinJSON) => new Pin(pinJSON, this));
      this.dataTypes = json.dataTypes.map((dataTypeJSON) =>
        DataType.fromJSON(dataTypeJSON, this)
      );
    }
  }

  toJSON(): ChessboardJSON {
    return {
      x: this.x,
      y: this.y,
      k: this.k,
      chessmen: this.chessmen.map((chessman) => chessman.toJSON()),
      pins: this.pins.map((pin) => pin.toJSON()),
      dataTypes: this.dataTypes.map((dataType) => dataType.toJSON()),
      variables: this.variables.map((variable) => variable.toJSON()),
    };
  }
}

export default Chessboard;

interface Chessboard {
  x: number;
  y: number;
  k: number;
  chessmen: Chessman[];
  pins: Pin[];
  dataTypes: DataType[];
  variables: Variable[];
}

export interface ChessboardJSON {
  x: number;
  y: number;
  k: number;
  chessmen: ChessmanJSON[];
  pins: PinJSON[];
  dataTypes: DataTypeJSON[];
  variables: VariableJSON[];
}
