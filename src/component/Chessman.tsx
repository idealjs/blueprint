import interact from "interactjs";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../reducer";
import { chessmenSelector, updateChessman } from "../reducer/chessmen";
import Pin from "./Pin";
interface IProps {
  id: string;
  svgRef: React.RefObject<SVGSVGElement>;
  chessboardScale: number;
  chessboardOffset: {
    x: number;
    y: number;
  };
}

const Chessman = (props: IProps) => {
  const { id, svgRef, chessboardOffset, chessboardScale } = props;
  const { x, y, height, width } = useSelector((state: RootState) =>
    chessmenSelector.selectById(state, id)
  )!;
  const ref = useRef<SVGRectElement>(null);
  const dispatch = useDispatch();
  const chessman = useSelector((state: RootState) =>
    chessmenSelector.selectById(state, id)
  );

  useEffect(() => {
    let x1: number = 0;
    let y1: number = 0;
    interact(ref.current!).draggable({
      listeners: {
        start: (event) => {
          x1 = event.clientX0 - ref.current?.getBoundingClientRect().left!;
          y1 = event.clientY0 - ref.current?.getBoundingClientRect().top!;
        },
        move: (event) => {
          dispatch(
            updateChessman({
              id: id,
              changes: {
                x:
                  (event.client.x -
                    svgRef.current?.getBoundingClientRect().left! -
                    chessboardOffset.x -
                    x1) /
                  chessboardScale,
                y:
                  (event.client.y -
                    svgRef.current?.getBoundingClientRect().top! -
                    chessboardOffset.y -
                    y1) /
                  chessboardScale,
              },
            })
          );
        },
        end: () => {},
      },
    });
  }, [chessboardOffset, chessboardScale, dispatch, id, svgRef]);

  return (
    <g ref={ref} transform={`translate(${x}, ${y})`}>
      <rect
        id={id}
        width={width}
        height={30}
        style={{ fill: "black" }}
        x="0"
        y="0"
      />
      <rect
        id={id}
        width={width}
        height={height}
        style={{ fill: "wheat" }}
        x="0"
        y="20"
      />
      {chessman?.pins.map((pinId) => (
        <Pin svgRef={svgRef} id={pinId} key={pinId} />
      ))}
    </g>
  );
};

export default Chessman;
