import { DataTypeJSON } from "..";
import DataType from "./DataType";
import Pin, { PinJSON } from "./Pin";

class Chessman {
  id: string;
  dataType: DataType;
  pins: Pin[];
  x: number;
  y: number;

  constructor(chessman: ChessmanJSON) {
    this.id = chessman.id;
    this.dataType = new DataType(chessman.dataType);
    this.x = chessman.x || 0;
    this.y = chessman.y || 0;
    this.pins = chessman.pins.map((p) => new Pin(p));
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
