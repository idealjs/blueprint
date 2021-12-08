import Chessboard from "./Chessboard";
import Chessman, { ChessmanJSON } from "./Chessman";

class Pin {
  constructor(json: PinJSON, chessboard: Chessboard) {
    this.id = json.id;
    this.type = json.type;
    this.parent = new Chessman(json.parent, chessboard);
    this.connected = json.connected.map(
      (pinJSON) => new Pin(pinJSON, chessboard)
    );
    this.x = json.x;
    this.y = json.y;
  }

  toJSON(): PinJSON {
    return {
      id: this.id,
      type: this.type,
      parent: this.parent.toJSON(),
      connected: this.connected.map((pin) => pin.toJSON()),
      x: this.x,
      y: this.y,
    };
  }
}

export default Pin;

interface Pin {
  id: string;
  type: PIN_TYPE;
  parent: Chessman;
  connected: Pin[];
  x: number;
  y: number;
}

export interface PinJSON {
  id: string;
  type: PIN_TYPE;
  parent: ChessmanJSON;
  connected: PinJSON[];
  x: number;
  y: number;
}

export enum PIN_TYPE {
  IN = "IN",
  OUT = "OUT",
}
