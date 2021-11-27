import { DND_EVENT } from "@idealjs/drag-drop";
import { useDnd } from "@idealjs/drag-drop-react";
import { RefObject, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../reducer";
import { IChessboardState } from "../reducer/chessboard";
import { chessmenSelector, updateChessman } from "../reducer/chessmen";
import Pin from "./Pin";
interface IProps {
  id: string;
  svgRef: RefObject<SVGSVGElement>;
  chessboardRef: RefObject<IChessboardState>;
}
const Chessman = (props: IProps) => {
  const { id, svgRef, chessboardRef } = props;
  const ref = useRef<SVGRectElement>(null);

  const { x, y } = useSelector((state: RootState) =>
    chessmenSelector.selectById(state, id)
  )!;
  const dispatch = useDispatch();
  const chessman = useSelector((state: RootState) =>
    chessmenSelector.selectById(state, id)
  );

  const dnd = useDnd();

  useEffect(() => {
    if (ref.current && svgRef.current && chessboardRef.current) {
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
                    chessboardRef.current!.x +
                    payload.offset.x) /
                  chessboardRef.current!.k,
                y:
                  (originPos.y -
                    svgOffset.y -
                    chessboardRef.current!.y +
                    payload.offset.y) /
                  chessboardRef.current!.k,
              },
            })
          );
        });
      return () => {
        listenable.removeEleListeners().removeAllListeners();
      };
    }
  }, [chessboardRef, dispatch, dnd, id, svgRef]);

  return (
    <g id={id} ref={ref} transform={`translate(${x}, ${y})`}>
      <rect rx="15" ry="15" width={120} height={120} />
      <rect
        x={10}
        y={10}
        rx="10"
        ry="10"
        width={100}
        height={100}
        style={{ fill: "wheat" }}
      />
      {chessman?.pinIds.map((pinId) => (
        <Pin id={pinId} key={pinId} />
      ))}
    </g>
  );
};

export default Chessman;
