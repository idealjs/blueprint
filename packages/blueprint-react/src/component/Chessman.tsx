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
    if (ref.current && svgRef.current) {
      let originPos: {
        x: number;
        y: number;
      } = {
        x: ref.current.getBoundingClientRect().left,
        y: ref.current.getBoundingClientRect().top,
      };

      let svgOffset: {
        x: number;
        y: number;
      } = {
        x: svgRef.current.getBoundingClientRect().left,
        y: svgRef.current.getBoundingClientRect().top,
      };

      const listenable = dnd
        .draggable(ref.current)
        .addListener(DND_EVENT.DRAG_START, () => {
          originPos = {
            x: ref.current!.getBoundingClientRect().left,
            y: ref.current!.getBoundingClientRect().top,
          };
          svgOffset = {
            x: svgRef.current!.getBoundingClientRect().left,
            y: svgRef.current!.getBoundingClientRect().top,
          };
        })
        .addListener(DND_EVENT.DRAG, (payload) => {
          dispatch(
            updateChessman({
              id: id,
              changes: {
                x:
                  (originPos.x -
                    svgOffset.x -
                    chessboardContainer.current.x +
                    payload.offset.x) /
                  chessboardContainer.current.k,
                y:
                  (originPos.y -
                    svgOffset.y -
                    chessboardContainer.current.y +
                    payload.offset.y) /
                  chessboardContainer.current.k,
              },
            })
          );
          console.log("test test", payload);
        });
      return () => {
        listenable.removeEleListeners().removeAllListeners();
      };
    }
  }, [dispatch, dnd, id, svgRef]);

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
