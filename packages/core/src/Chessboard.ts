import { ChessmanJSON, DataType, DataTypeJSON, PinJSON } from "..";
import Chessman from "./Chessman";
import Pin from "./Pin";

class Chessboard {
  public x: number = 0;
  public y: number = 0;
  public k: number = 1;
  public chessmen: Chessman[] = [];
  public pins: Pin[] = [];
  public dataTypes: DataType[] = [];

  constructor(chessboardJSON?: ChessboardJSON) {
    if (chessboardJSON) {
      this.x = chessboardJSON.x;
      this.y = chessboardJSON.y;
      this.k = chessboardJSON.k;
      this.chessmen = chessboardJSON.chessmen.map(
        (chessmanJSON) => new Chessman(chessmanJSON)
      );
      this.pins = chessboardJSON.pins.map((pinJSON) => new Pin(pinJSON));
      this.dataTypes = chessboardJSON.dataTypes.map(
        (dataTypeJSON) => new DataType(dataTypeJSON)
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
}

export interface ChessboardJSON {
  x: number;
  y: number;
  k: number;
  chessmen: ChessmanJSON[];
  pins: PinJSON[];
  dataTypes: DataTypeJSON[];
}
