import interact from "interactjs";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAddChessman } from "../hook/test/useAddChessman";
import { RootState } from "../reducer";
import { updateChessboard } from "../reducer/chessboard";
import { chessmenSelector } from "../reducer/chessmen";
import Chessman from "./Chessman";
import PathLayer from "./PathLayer";

const Chessboard: FC = () => {
  const chessmenIds = useSelector(
    (state: RootState) => chessmenSelector.selectIds(state) as string[]
  );
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const chessboard = useSelector((state: RootState) => state.chessboard);
  const chessboardContainer = useRef(chessboard);
  const dispatch = useDispatch();
  useEffect(() => {
    chessboardContainer.current = chessboard;
  }, [chessboard]);

  useEffect(() => {
    let x0: number = 0;
    let y0: number = 0;
    let x1: number = 0;
    let y1: number = 0;
    interact(svgRef.current!).draggable({
      listeners: {
        start: (event) => {
          x1 = event.clientX0 - svgRef.current?.getBoundingClientRect().left!;
          y1 = event.clientY0 - svgRef.current?.getBoundingClientRect().top!;
        },
        move: (event) => {
          dispatch(
            updateChessboard({
              x:
                x0 +
                event.client.x -
                svgRef.current?.getBoundingClientRect().left! -
                x1,
              y:
                y0 +
                event.client.y -
                svgRef.current?.getBoundingClientRect().top! -
                y1,
            })
          );
        },
        end: (event) => {
          x0 =
            x0 +
            event.client.x -
            svgRef.current?.getBoundingClientRect().left! -
            x1;
          y0 =
            y0 +
            event.client.y -
            svgRef.current?.getBoundingClientRect().top! -
            y1;
        },
      },
    });
  }, [dispatch]);

  const addChessman = useAddChessman();

  useCallback(() => {}, []);

  useEffect(() => {
    interact(svgRef.current!).dropzone({
      ondrop: (event) => {
        console.log("drop", event);
        if (event.relatedTarget.className === "menuItem") {
          addChessman(
            event.dragEvent.client.x -
              chessboardContainer.current.x -
              svgRef.current!.getBoundingClientRect().left,
            event.dragEvent.client.y - chessboardContainer.current.y
          );
        }
        console.log("drop at chessboard");
      },
    });
  }, [addChessman]);

  const onWheel = useCallback(
    (event) => {
      console.log("onWheel", event.deltaY);
      event.persist();
      dispatch(
        updateChessboard({
          k: chessboardContainer.current.k - event.deltaY / 200,
        })
      );
    },
    [dispatch]
  );

  const onContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    console.log(event.clientX);
    console.log(event.clientY);
  };

  return (
    <svg
      ref={svgRef}
      height="100%"
      width="100%"
      onWheel={onWheel}
      onContextMenu={onContextMenu}
      style={{ touchAction: "none" }}
    >
      <g
        ref={gRef}
        transform={`translate(${chessboard.x}, ${chessboard.y}) scale(${chessboard.k})`}
      >
        {chessmenIds.map((chessmanId) => (
          <Chessman svgRef={svgRef} id={chessmanId} key={chessmanId} />
        ))}
        <PathLayer />
      </g>
    </svg>
  );
};

export default Chessboard;
