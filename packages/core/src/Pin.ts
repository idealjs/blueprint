import uniqid from "uniqid";

import { Chessboard } from "..";
import Chessman, { IChessman } from "./Chessman";
import { RequiredBy } from "./type";

class Pin {
  id: string = uniqid();
  type: PIN_TYPE;
  parent: Chessman;
  connected: Map<string, Pin> = new Map<string, Pin>();
  x: number = 0;
  y: number = 0;

  constructor(
    chessboard: Chessboard,
    pin: RequiredBy<Partial<IPin>, "id" | "type" | "parent">
  ) {
    this.type = pin.type;
    let parent = Chessman.fromJSON(chessboard, pin.parent);
    this.parent = parent;
    if (pin.id) this.id = pin.id;
    if (pin.x) this.x = pin.x;
    if (pin.y) this.y = pin.y;
    if (pin.connected) {
      pin.connected.forEach((value, key) => {
        this.connected.set(key, Pin.fromJSON(chessboard, value));
      });
    }
  }

  static fromJSON(
    chessboard: Chessboard,
    pin: RequiredBy<Partial<IPin>, "id" | "type" | "parent">
  ) {
    const p = chessboard.pinMap.get(pin.id);
    if (p != null) {
      return p;
    }
    return new Pin(chessboard, pin);
  }

  toJSON(): IPin {
    let connected = new Map<string, IPin>();
    this.connected?.forEach((value, key) => {
      connected.set(key, value.toJSON());
    });
    return {
      id: this.id,
      type: this.type,
      parent: this.parent.toJSON(),
      connected,
      x: this.x,
      y: this.y,
    };
  }
}

export default Pin;

export interface IPin {
  id: string;
  type: PIN_TYPE;
  parent: IChessman;
  connected: Map<string, IPin>;
  x: number;
  y: number;
}

export enum PIN_TYPE {
  IN = "IN",
  OUT = "OUT",
}
