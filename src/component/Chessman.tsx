import interact from "interactjs";
import React, { memo, RefObject,useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../reducer";
import { chessmenSelector, updateChessman } from "../reducer/chessmen";
import Pin from "./Pin";
interface IProps {
  id: string;
  svgRef: RefObject<SVGSVGElement>;
}
const Chessman = memo((props: IProps) => {
  const { id, svgRef } = props;
  const { x, y, height, width } = useSelector((state: RootState) =>
    chessmenSelector.selectById(state, id)
  )!;
  const ref = useRef<SVGRectElement>(null);
  const dispatch = useDispatch();
  const chessman = useSelector((state: RootState) =>
    chessmenSelector.selectById(state, id)
  );

  const chessboard = useSelector((state: RootState) => state.chessboard);
  const chessboardContainer = useRef(chessboard);
  useEffect(() => {
    chessboardContainer.current = chessboard;
  }, [chessboard]);
  console.log("current", x, y);

  useEffect(() => {
    let x1: number = 0;
    let y1: number = 0;
    interact(ref.current!).draggable({
      listeners: {
        start: (event) => {
          console.log(
            "drag start",
            x1,
            y1,
            ref.current?.getBoundingClientRect().left
          );
          x1 = event.clientX0 - ref.current?.getBoundingClientRect().left!;
          y1 = event.clientY0 - ref.current?.getBoundingClientRect().top!;
        },
        move: (event) => {
          console.log("drag move", x1, y1);

          dispatch(
            updateChessman({
              id: id,
              changes: {
                x:
                  (event.client.x -
                    svgRef.current?.getBoundingClientRect().left! -
                    chessboardContainer.current.x -
                    x1) /
                  chessboardContainer.current.k,
                y:
                  (event.client.y -
                    svgRef.current?.getBoundingClientRect().top! -
                    chessboardContainer.current.y -
                    y1) /
                  chessboardContainer.current.k,
              },
            })
          );
        },
        end: () => {},
      },
    });
  }, [dispatch, id, svgRef]);
  return (
    <g ref={ref} transform={`translate(${x}, ${y})`}>
      <rect
        rx="15"
        ry="15"
        width={width + 2 * chessman!.border}
        height={height + 2 * chessman!.border}
      />
      <rect
        id={id}
        x={chessman!.border}
        y={chessman!.border}
        rx="10"
        ry="10"
        width={width}
        height={height}
        style={{ fill: "wheat" }}
      />
      {chessman?.pins.map((pinId) => (
        <Pin svgRef={svgRef} id={pinId} key={pinId} />
      ))}
    </g>
  );
});

export default Chessman;
