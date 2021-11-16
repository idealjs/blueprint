import uniqid from "uniqid";

import { Chessboard } from "..";
import Chessman, { IChessman } from "./Chessman";
import DataTypeManager from "./DataTypeManager";
import { RequiredBy } from "./type";

class Pin {
  id: string = uniqid();
  type: PIN_TYPE;
  parent: Chessman;
  connected?: Map<string, Pin>;

  constructor(
    chessboard: Chessboard,
    dataTypeManager: DataTypeManager,
    pin: RequiredBy<Partial<IPin>, "id" | "type" | "parent">
  ) {
    this.type = pin.type;
    let parent = Chessman.fromJSON(chessboard, dataTypeManager, pin.parent);
    this.parent = parent;
    if (pin.id) this.id = pin.id;

    if (pin.connected) {
      let connected = new Map<string, Pin>();
      pin.connected.forEach((value, key) => {
        connected.set(key, Pin.fromJSON(chessboard, dataTypeManager, value));
      });
      this.connected = connected;
    }
  }

  static fromJSON(
    chessboard: Chessboard,
    dataTypeManager: DataTypeManager,
    pin: RequiredBy<Partial<IPin>, "id" | "type" | "parent">
  ) {
    const p = chessboard.pinMap.get(pin.id);
    if (p != null) {
      return p;
    }
    return new Pin(chessboard, dataTypeManager, pin);
  }

  toJSON(): IPin {
    if (this.connected) {
      let connected = new Map<string, IPin>();
      this.connected?.forEach((value, key) => {
        connected.set(key, value.toJSON());
      });
      return {
        id: this.id,
        type: this.type,
        parent: this.parent.toJSON(),
        connected,
      };
    }
    return {
      id: this.id,
      type: this.type,
      parent: this.parent.toJSON(),
    };
  }
}

export default Pin;

export interface IPin {
  id: string;
  type: PIN_TYPE;
  parent: IChessman;
  connected?: Map<string, IPin>;
}

export enum PIN_TYPE {
  IN = "IN",
  OUT = "OUT",
}
