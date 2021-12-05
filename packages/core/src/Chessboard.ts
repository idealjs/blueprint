import { Chessman, DataType } from "..";
import { IChessman } from "./Chessman";
import Pin, { IPin } from "./Pin";

class Chessboard {
  public x: number = 0;
  public y: number = 0;
  public k: number = 1;
  public chessmanMap = new Map<string, Chessman>();
  public pinMap = new Map<string, Pin>();
  public dataTypeMap = new Map<string, DataType>();

  constructor(chessboard?: Partial<Chessboard>) {
    // if (chessboard?.x) this.x = chessboard.x;
    // if (chessboard?.y) this.y = chessboard.y;
    // if (chessboard?.k) this.k = chessboard.k;
    // if (chessboard?.chessmanMap) {
    //   chessboard.chessmanMap.forEach((value, key) => {
    //     this.chessmanMap.set(key, Chessman.fromJSON(this, value));
    //   });
    // }
    // if (chessboard?.pinMap) {
    //   chessboard.pinMap.forEach((value, key) => {
    //     this.pinMap.set(key, Pin.fromJSON(this, value));
    //   });
    // }
  }

  addChessman(chessman: Chessman) {}

  // toJSON(): IChessboard {
  //   const chessmanMap = new Map<string, IChessman>();
  //   this.chessmanMap.forEach((chessman, key) => {
  //     chessmanMap.set(key, chessman.toJSON());
  //   });

  //   const pinMap = new Map<string, IPin>();
  //   this.pinMap.forEach((pin, key) => {
  //     pinMap.set(key, pin.toJSON());
  //   });

  //   return {
  //     x: this.x,
  //     y: this.y,
  //     k: this.k,
  //     chessmanMap,
  //     pinMap,
  //   };
  // }
}

export default Chessboard;

interface Chessboard {
  x: number;
  y: number;
  k: number;
  chessmen: Chessman[];
  pins: Pin[];
  dataTypes: DataType;
}

export interface IChessboardJSON {
  x: number;
  y: number;
  k: number;
  chessmen: IChessmanJSON[];
  dataTypes: IDataTypeJSON[];
  pins: IPinJSON[];
}
