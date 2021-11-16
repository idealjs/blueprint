import { Chessman } from "..";
import { IChessman } from "./Chessman";
import Pin, { IPin } from "./Pin";

class Chessboard {
  public x: number = 0;
  public y: number = 0;
  public k: number = 1;
  public chessmanMap = new Map<string, Chessman>();
  public pinMap = new Map<string, Pin>();

  constructor(target: HTMLElement) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.height = "100%";
    svg.style.width = "100%";
    target.append(svg);
  }

  addChessman(chessman: Chessman) {}

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
