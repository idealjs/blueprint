import Chessman, { ChessmanJSON } from "./Chessman";

class Pin {
  constructor(pinJSON: PinJSON) {
    this.id = pinJSON.id;
    this.parent = new Chessman(pinJSON.parent);
    this.connected = pinJSON.connected.map((pinJSON) => new Pin(pinJSON));
    this.x = pinJSON.x;
    this.y = pinJSON.y;
  }

  toJSON(): PinJSON {
    return {
      id: this.id,
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
  parent: Chessman;
  connected: Pin[];
  x: number;
  y: number;
}

export interface PinJSON {
  id: string;
  parent: ChessmanJSON;
  connected: PinJSON[];
  x: number;
  y: number;
}

export enum PIN_TYPE {
  IN = "IN",
  OUT = "OUT",
}
