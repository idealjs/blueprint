import interact from "interactjs";
import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../reducer";
import { chessmenSelector } from "../reducer/chessmen";
import Chessman from "./Chessman";
import PathLayer from "./PathLayer";

const Chessboard: FC = () => {
  const chessmenIds = useSelector(
    (state: RootState) => chessmenSelector.selectIds(state) as string[]
  );
  const ref = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    let x0: number = 0;
    let y0: number = 0;
    let x1: number = 0;
    let y1: number = 0;
    interact(ref.current!).draggable({
      listeners: {
        start: (event) => {
          x1 = event.clientX0 - ref.current?.getBoundingClientRect().left!;
          y1 = event.clientY0 - ref.current?.getBoundingClientRect().top!;
        },
        move: (event) => {
          console.log(
            event.client.x - ref.current?.getBoundingClientRect().left!,
            x1
          );

          setOffset((offset) => ({
            x:
              x0 +
              event.client.x -
              ref.current?.getBoundingClientRect().left! -
              x1,
            y:
              y0 +
              event.client.y -
              ref.current?.getBoundingClientRect().top! -
              y1,
          }));
        },
        end: (event) => {
          x0 =
            x0 +
            event.client.x -
            ref.current?.getBoundingClientRect().left! -
            x1;
          y0 =
            y0 +
            event.client.y -
            ref.current?.getBoundingClientRect().top! -
            y1;
        },
      },
    });
  }, []);

  return (
    <svg ref={ref} height="50%" width="50%">
      <g ref={gRef} transform={`translate(${offset.x}, ${offset.y})`}>
        {chessmenIds.map((chessmanId) => (
          <Chessman
            svgRef={ref}
            id={chessmanId}
            key={chessmanId}
            chessboardOffset={offset}
          />
        ))}
        <PathLayer />
      </g>
    </svg>
  );
};

export default Chessboard;
