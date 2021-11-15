import { Chessman } from "..";
import { IChessman } from "./Chessman";

class Chessboard implements IChessboard {
  public chessmenMap = new Map<string, Chessman>();
  constructor(target: HTMLElement) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.height = "100%";
    svg.style.width = "100%";
    target.append(svg);
  }

  addChessman(chessman: Chessman) {}
}

export default Chessboard;

interface IChessboard {
  chessmenMap: Map<string, IChessman>;
}
