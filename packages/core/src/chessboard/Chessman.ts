import DataType from "../dataType/DataType";
import { DataTypeJSON } from "../type";
import Chessboard from "./Chessboard";
import Pin, { PinJSON } from "./Pin";

class Chessman {
  id: string;
  dataType: DataType;
  pins: Pin[];
  x: number;
  y: number;

  constructor(json: ChessmanJSON, chessboard: Chessboard) {
    this.id = json.id;
    this.dataType = DataType.fromJSON(json.dataType, chessboard);
    this.x = json.x || 0;
    this.y = json.y || 0;
    this.pins = json.pins.map((p) => new Pin(p, chessboard));
  }

  toJSON(): ChessmanJSON {
    return {
      id: this.id,
      dataType: this.dataType.toJSON(),
      x: this.x,
      y: this.y,
      pins: this.pins.map((p) => p.toJSON()),
    };
  }
}

export default Chessman;

export interface ChessmanJSON {
  id: string;
  dataType: DataTypeJSON;
  pins: PinJSON[];
  x: number;
  y: number;
}
