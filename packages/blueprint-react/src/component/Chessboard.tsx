import { DND_EVENT, IDropData } from "@idealjs/drag-drop";
import { useDnd } from "@idealjs/drag-drop-react";
import {
  EventHandler,
  FC,
  useCallback,
  useEffect,
  useRef,
  WheelEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAddChessman } from "../hook/test/useAddChessman";
import { RootState } from "../reducer";
import { updateChessboard } from "../reducer/chessboard";
import { chessmenSelector } from "../reducer/chessmen";
import Chessman from "./Chessman";
import PathLayer from "./PathLayer";
interface IProps {}

const Chessboard: FC<IProps> = (props) => {
  const { children } = props;
  const chessmenIds = useSelector(
    (state: RootState) => chessmenSelector.selectIds(state) as string[]
  );
  const svgRef = useRef<SVGSVGElement>(null);
  const chessboard = useSelector((state: RootState) => state.chessboard);
  const chessboardRef = useRef(chessboard);
  const dispatch = useDispatch();
  const dnd = useDnd();
  const addChessman = useAddChessman();

  useEffect(() => {
    chessboardRef.current = chessboard;
  }, [chessboard]);

  useEffect(() => {
    if (svgRef.current) {
      let x = 0;
      let y = 0;
      const listenable = dnd
        .draggable(svgRef.current)
        .addListener(DND_EVENT.DRAG_START, (payload) => {
          x = chessboardRef.current.x;
          y = chessboardRef.current.y;
        })
        .addListener(DND_EVENT.DRAG, (payload) => {
          console.log("test test drag chessboard", payload);
          dispatch(
            updateChessboard({
              x: x + payload.offset.x,
              y: y + payload.offset.y,
            })
          );
        });

      return () => {
        listenable.removeEleListeners().removeAllListeners();
      };
    }
  }, [dispatch, dnd]);

  useEffect(() => {
    if (svgRef.current) {
      let svgOffset: {
        x: number;
        y: number;
      } = {
        x: svgRef.current.getBoundingClientRect().left,
        y: svgRef.current.getBoundingClientRect().top,
      };

      const listenable = dnd.droppable(svgRef.current).addListener(
        DND_EVENT.DROP,
        (
          payload: IDropData<{
            id: string;
          }>
        ) => {
          if (payload.item?.id === "menu-chessman") {
            addChessman(
              (payload.clientPosition.x -
                chessboardRef.current.x -
                svgOffset.x) /
                chessboardRef.current.k,
              (payload.clientPosition.y -
                chessboardRef.current.y -
                svgOffset.y) /
                chessboardRef.current.k
            );
          }
        }
      );

      return () => {
        listenable.removeEleListeners().removeAllListeners();
      };
    }
  }, [addChessman, dnd]);

  const onWheel: EventHandler<WheelEvent> = useCallback(
    (event) => {
      console.log("onWheel", event.deltaY);
      // event.persist();
      dispatch(
        updateChessboard({
          k: chessboardRef.current.k - Math.sign(event.deltaY) / 10,
        })
      );
    },
    [dispatch]
  );

  // const onContextMenu = (event: React.MouseEvent) => {
  //   event.preventDefault();
  //   console.log(event.clientX);
  //   console.log(event.clientY);
  // };

  return (
    <svg
      ref={svgRef}
      height="100%"
      width="100%"
      onWheel={onWheel}
      // onContextMenu={onContextMenu}
      style={{
        touchAction: "none",
        backgroundSize: `${40 * chessboard.k}px ${40 * chessboard.k}px`,
        backgroundPosition: `${chessboard.x}px ${chessboard.y}px`,
        backgroundImage:
          "linear-gradient(to right, #4F4E4F 1px, transparent 1px),linear-gradient(to bottom, #4F4E4F 1px, transparent 1px)",
      }}
    >
      <g
        transform={`translate(${chessboard.x}, ${chessboard.y}) scale(${chessboard.k})`}
      >
        {children}
        {chessmenIds.map((chessmanId) => (
          <Chessman
            svgRef={svgRef}
            chessboardRef={chessboardRef}
            id={chessmanId}
            key={chessmanId}
          />
        ))}
        <PathLayer />
      </g>
    </svg>
  );
};

export default Chessboard;
