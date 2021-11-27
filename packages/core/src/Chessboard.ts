import { Chessman } from "..";
import { IChessman } from "./Chessman";
import DataTypeManager from "./DataTypeManager";
import Pin, { IPin } from "./Pin";

class Chessboard {
  public x: number = 0;
  public y: number = 0;
  public k: number = 1;
  public chessmanMap = new Map<string, Chessman>();
  public pinMap = new Map<string, Pin>();
  public dataTypeManager: DataTypeManager;
  constructor(
    dataTypeManager: DataTypeManager,
    chessboard: Partial<IChessboard>
  ) {
    this.dataTypeManager = dataTypeManager;
    if (chessboard.x) this.x = chessboard.x;
    if (chessboard.y) this.y = chessboard.y;
    if (chessboard.k) this.k = chessboard.k;
    if (chessboard.chessmanMap) {
      chessboard.chessmanMap.forEach((value, key) => {
        this.chessmanMap.set(
          key,
          Chessman.fromJSON(this, this.dataTypeManager, value)
        );
      });
    }
    if (chessboard.pinMap) {
      chessboard.pinMap.forEach((value, key) => {
        this.pinMap.set(key, Pin.fromJSON(this, this.dataTypeManager, value));
      });
    }
  }

  addChessman(chessman: Chessman) {}

  fromJSON(json: IChessboard) {
    this.x = json.x;
    this.y = json.y;
    this.k = json.k;
    json.chessmanMap.forEach((value, key) => {
      this.chessmanMap.set(
        key,
        Chessman.fromJSON(this, this.dataTypeManager, value)
      );
    });
    json.pinMap.forEach((value, key) => {
      this.pinMap.set(key, Pin.fromJSON(this, this.dataTypeManager, value));
    });
  }

  toJSON(): IChessboard {
    const chessmanMap = new Map<string, IChessman>();
    this.chessmanMap.forEach((chessman, key) => {
      chessmanMap.set(key, chessman.toJSON());
    });

    const pinMap = new Map<string, IPin>();
    this.pinMap.forEach((pin, key) => {
      pinMap.set(key, pin.toJSON());
    });

    return {
      x: this.x,
      y: this.y,
      k: this.k,
      chessmanMap,
      pinMap,
    };
  }
}

export default Chessboard;

interface IChessboard {
  x: number;
  y: number;
  k: number;
  chessmanMap: Map<string, IChessman>;
  pinMap: Map<string, IPin>;
}
