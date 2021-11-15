import uniqid from "uniqid";

import { IPin } from "./Pin";
import { IDataType, RequiredBy } from "./type";

class Chessman implements IChessman {
  id: string = uniqid();
  type: IChessmanType;
  pins: Map<string, IPin> = new Map();

  constructor(chessman: RequiredBy<Partial<IChessman>, "type">) {
    this.type = chessman.type;
    if (chessman.id) this.id = chessman.id;
    if (chessman.pins) this.pins = chessman.pins;
  }
}

export default Chessman;

interface IChessmanType {
  isArray: boolean;
  dataType: IDataType;
}

export interface IChessman {
  id: string;
  type: IChessmanType;
  pins: Map<string, IPin>;
}
