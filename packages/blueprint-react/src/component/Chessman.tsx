import { DND_EVENT } from "@idealjs/drag-drop";
import { useDnd } from "@idealjs/drag-drop-react";
import { memo, RefObject, useEffect, useRef } from "react";
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

  const ref = useRef<SVGRectElement>(null);

  const { x, y, height, width } = useSelector((state: RootState) =>
    chessmenSelector.selectById(state, id)
  )!;
  const dispatch = useDispatch();
  const chessman = useSelector((state: RootState) =>
    chessmenSelector.selectById(state, id)
  );

  const chessboard = useSelector((state: RootState) => state.chessboard);
  const chessboardContainer = useRef(chessboard);
  useEffect(() => {
    chessboardContainer.current = chessboard;
  }, [chessboard]);

  const dnd = useDnd();

  useEffect(() => {
    if (ref.current) {
      const listenable = dnd
        .draggable(ref.current)
        .addListener(DND_EVENT.DRAG, (payload) => {
          console.log("test test", payload);
        });
      return () => {
        listenable.removeEleListeners().removeAllListeners();
      };
    }
  }, [dnd]);

  // useEffect(() => {
  //   let x1: number = 0;
  //   let y1: number = 0;
  //   interact(ref.current!).draggable({
  //     listeners: {
  //       start: (event) => {
  //         console.log(
  //           "drag start",
  //           x1,
  //           y1,
  //           ref.current?.getBoundingClientRect().left
  //         );
  //         x1 = event.clientX0 - ref.current?.getBoundingClientRect().left!;
  //         y1 = event.clientY0 - ref.current?.getBoundingClientRect().top!;
  //       },
  //       move: (event) => {
  //         console.log("drag move", x1, y1);

  //         dispatch(
  //           updateChessman({
  //             id: id,
  //             changes: {
  //               x:
  //                 (event.client.x -
  //                   svgRef.current?.getBoundingClientRect().left! -
  //                   chessboardContainer.current.x -
  //                   x1) /
  //                 chessboardContainer.current.k,
  //               y:
  //                 (event.client.y -
  //                   svgRef.current?.getBoundingClientRect().top! -
  //                   chessboardContainer.current.y -
  //                   y1) /
  //                 chessboardContainer.current.k,
  //             },
  //           })
  //         );
  //       },
  //       end: () => {},
  //     },
  //   });
  // }, [dispatch, id, svgRef]);

  return (
    <g id={id} ref={ref} transform={`translate(${x}, ${y})`}>
      <rect
        rx="15"
        ry="15"
        width={width + 2 * chessman!.border}
        height={height + 2 * chessman!.border}
      />
      <rect
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
