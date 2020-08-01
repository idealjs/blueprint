import interact from "interactjs";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../reducer";
import { chessmenSelector, updateChessman } from "../reducer/chessmen";
import Pin from "./Pin";
interface IProps {
  id: string | number;
  svgRef: React.RefObject<SVGSVGElement>;
}

const Chessman = (props: IProps) => {
  const { id, svgRef } = props;
  const { x, y, height, width } = useSelector((state: RootState) =>
    chessmenSelector.selectById(state, id)
  )!;
  const ref = useRef<SVGRectElement>(null);
  const dispatch = useDispatch();
  const chessman = useSelector((state: RootState) =>
    chessmenSelector.selectById(state, id)
  );

  useEffect(() => {
    let x1: number;
    let y1: number;
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
                  event.client.x -
                  svgRef.current?.getBoundingClientRect().left! -
                  x1,
                y:
                  event.client.y -
                  svgRef.current?.getBoundingClientRect().top! -
                  y1,
              },
            })
          );
        },
        end: () => {
          console.log("end drag");
        },
      },
    });
  }, [dispatch, id, svgRef]);

  return (
    <g ref={ref} transform={`translate(${x},${y})`}>
      <rect width={width} height={height} style={{ fill: "wheat" }} />
      {chessman?.pins.map((pinId) => (
        <Pin svgRef={svgRef} id={pinId} key={pinId} />
      ))}
    </g>
  );
};

export default Chessman;
