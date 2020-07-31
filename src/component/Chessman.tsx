import interact from "interactjs";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../reducer";
import { chessmenSelector, updateChessman } from "../reducer/chessmen";
import Pin from "./Pin";
interface IProps {
  id: string | number;
}

const Chessman = (props: IProps) => {
  const { id } = props;
  const { x, y, height, width } = useSelector((state: RootState) =>
    chessmenSelector.selectById(state, id)
  )!;
  const ref = useRef<SVGRectElement>(null);
  const dispatch = useDispatch();
  const chessman = useSelector((state: RootState) =>
    chessmenSelector.selectById(state, id)
  );

  useEffect(() => {
    interact(ref.current!).draggable({
      listeners: {
        start: (event) => {
          console.log("start drag", event);
        },
        move: (event) => {
          console.log("move drag", event);
          dispatch(
            updateChessman({
              id: id,
              changes: {
                x: event.client.x - event.clientX0,
                y: event.client.y - event.clientY0,
              },
            })
          );
        },
        end: () => {
          console.log("end drag");
        },
      },
    });
  }, [dispatch, id]);

  return (
    <g ref={ref}>
      <rect width={width} height={height} transform={`translate(${x},${y})`} />
      {chessman?.pins.map((pinId) => (
        <Pin id={pinId} key={pinId} />
      ))}
    </g>
  );
};

export default Chessman;
