class Chessboard {
  constructor(target: HTMLElement) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    target.append(svg);
  }
}

export default Chessboard;
