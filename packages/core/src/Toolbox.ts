class Toolbox {
  constructor(target: HTMLElement) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.height = "100%";
    svg.style.width = "100%";
    target.append(svg);
  }
}

export default Toolbox;

export interface IToolboxContent {
  kind: CONTENT_KIND;
  type: CONTENT_TYPE;
  name?: string;
  contents?: IToolboxContent[];
}

export enum CONTENT_KIND {
  CATEGORY = "CATEGORY",
}

export enum CONTENT_TYPE {
  CONTROLS_IF = "CONTROLS_IF",
}
