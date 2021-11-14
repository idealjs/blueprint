class Chessboard {
  constructor(target: HTMLElement) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.height = "100%";
    svg.style.width = "100%";
    target.append(svg);
  }
}

export default Chessboard;
