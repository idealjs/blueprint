import Chessboard from "./Chessboard";
import ChessmanType, { IChessmanType } from "./ChessmanType";
import DataTypeManager from "./DataTypeManager";
import Pin, { IPin } from "./Pin";
import { RequiredBy } from "./type";

class Chessman {
  id: string;
  type: ChessmanType;
  pins: Map<string, Pin> = new Map();

  constructor(
    chessboard: Chessboard,
    dataTypeManager: DataTypeManager,
    chessman: RequiredBy<Partial<IChessman>, "id" | "type">
  ) {
    this.id = chessman.id;
    this.type = new ChessmanType(dataTypeManager, chessman.type);
    if (chessman.pins) {
      chessman.pins.forEach((pin) => {
        this.pins.set(pin.id, Pin.fromJSON(chessboard, dataTypeManager, pin));
      });
    }
  }

  static fromJSON(
    chessboard: Chessboard,
    dataTypeManager: DataTypeManager,
    chessman: IChessman
  ) {
    const c = chessboard.chessmanMap.get(chessman.id);
    if (c != null) {
      return c;
    }
    return new Chessman(chessboard, dataTypeManager, chessman);
  }

  toJSON(): IChessman {
    return {
      id: this.id,
      type: this.type.toJSON(),
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
