import uniqid from "uniqid";

import { IChessman } from "./Chessman";
import { RequiredBy } from "./type";

class Pin implements IPin {
  id: string = uniqid();
  type: PIN_TYPE;
  parent: IChessman;
  targetPin?: IPin;

  constructor(pin: RequiredBy<Partial<IPin>, "type" | "parent">) {
    this.type = pin.type;
    this.parent = pin.parent;
    if (pin.id) this.id = pin.id;
    if (pin.targetPin) this.targetPin = pin.targetPin;
  }
}

export default Pin;

export interface IPin {
  id: string;
  type: PIN_TYPE;
  parent: IChessman;
  targetPin?: IPin;
}

export enum PIN_TYPE {
  IN = "IN",
  OUT = "OUT",
}
