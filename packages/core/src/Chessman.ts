import uniqid from "uniqid";

import Chessboard from "./Chessboard";
import ChessmanType, { IChessmanType } from "./ChessmanType";
import DataTypeManager from "./DataTypeManager";
import Pin, { IPin } from "./Pin";
import { RequiredBy } from "./type";

class Chessman {
  id: string = uniqid();
  type: ChessmanType;
  pins: Map<string, Pin> = new Map();

  constructor(
    chessboard: Chessboard,
    dataTypeManager: DataTypeManager,
    chessman: RequiredBy<Partial<IChessman>, "type">
  ) {
    this.type = new ChessmanType(dataTypeManager, chessman.type);
    if (chessman.id) this.id = chessman.id;
    if (chessman.pins) {
      chessman.pins.forEach((pin) => {
        this.pins.set(pin.id, new Pin(chessboard, dataTypeManager, pin));
      });
    }
  }

  toJSON(): IChessman {
    return {
      id: this.id,
      type: this.type,
      pins: this.pins,
    };
  }
}

export default Chessman;

export interface IChessman {
  id: string;
  type: IChessmanType;
  pins: Map<string, IPin>;
}
