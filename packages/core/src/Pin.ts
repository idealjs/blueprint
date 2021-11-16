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
    pin: RequiredBy<Partial<IPin>, "type" | "parent">
  ) {
    this.type = pin.type;
    let parent = chessboard.chessmanMap.get(pin.parent.id);
    if (parent == null) {
      parent = new Chessman(chessboard, dataTypeManager, pin.parent);
      chessboard.chessmanMap.set(parent.id, parent);
    }
    this.parent = parent;
    if (pin.id) this.id = pin.id;

    if (pin.connected) {
      let connected = new Map<string, Pin>();
      for (let [, value] of pin.connected) {
        let pin = new Pin(chessboard, dataTypeManager, value);
        connected.set(pin.id, pin);
      }
      this.connected = connected;
    }
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
