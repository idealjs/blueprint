import { DataType, IDataType } from "..";
import Chessboard from "./Chessboard";
import Pin, { IPin } from "./Pin";
import { RequiredBy } from "./type";

class Chessman {
  id: string;
  dataType: DataType;
  pinMap: Map<string, Pin> = new Map();
  x: number;
  y: number;

  constructor(
    chessboard: Chessboard,
    chessman: RequiredBy<Partial<IChessman>, "id" | "dataType">
  ) {
    this.id = chessman.id;
    this.dataType = new DataType(chessboard.dataTypeManager, chessman.dataType);
    this.x = chessman.x || 0;
    this.y = chessman.y || 0;
    if (chessman.pinMap) {
      chessman.pinMap.forEach((pin) => {
        this.pinMap.set(pin.id, Pin.fromJSON(chessboard, pin));
      });
    }
  }

  static fromJSON(chessboard: Chessboard, chessman: IChessman) {
    const c = chessboard.chessmanMap.get(chessman.id);
    if (c != null) {
      return c;
    }
    return new Chessman(chessboard, chessman);
  }

  toJSON(): IChessman {
    const pinMap = new Map<string, IPin>();
    this.pinMap.forEach((pin, key) => {
      pinMap.set(key, pin.toJSON());
    });

    return {
      id: this.id,
      dataType: this.dataType.toJSON(),
      pinMap,
      x: this.x,
      y: this.y,
    };
  }
}

export default Chessman;

export interface IChessman {
  id: string;
  dataType: IDataType;
  pinMap: Map<string, IPin>;
  x: number;
  y: number;
}
