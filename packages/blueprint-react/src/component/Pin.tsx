import { DND_EVENT, IDropData } from "@idealjs/drag-drop";
import { useDnd } from "@idealjs/drag-drop-react";
import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../reducer";
import { pinsSelector, updateManyPin } from "../reducer/pins";

interface IProps {
  id: string;
}

const Pin = memo((props: IProps) => {
  const { id } = props;
  const ref = useRef<SVGGElement>(null);
  const dnd = useDnd();
  const dispatch = useDispatch();
  const pin = useSelector((state: RootState) =>
    pinsSelector.selectById(state, id)
  );

  useEffect(() => {
    if (ref.current) {
      const listenable = dnd.draggable(ref.current, {
        item: { type: "chessman-pin", id },
      });
      return () => {
        listenable.removeEleListeners().removeAllListeners();
      };
    }
  }, [dnd, id]);

  useEffect(() => {
    if (ref.current) {
      const listenable = dnd.droppable(ref.current).addListener(
        DND_EVENT.DROP,
        (
          payload: IDropData<{
            id: string;
            type: string;
          }>
        ) => {
          console.log("test test", payload);
          if (payload.item?.type === "chessman-pin" && payload.item?.id) {
            dispatch(
              updateManyPin([
                {
                  id: payload.item.id,
                  changes: {
                    to: {
                      pinId: id,
                    },
                  },
                },
                {
                  id: id,
                  changes: {
                    to: {
                      pinId: payload.item.id,
                    },
                  },
                },
              ])
            );
          }
        }
      );
      return () => {
        listenable.removeEleListeners().removeAllListeners();
      };
    }
  }, [dispatch, dnd, id]);

  // useEffect(() => {
  //   interact(ref.current!).draggable({
  //     listeners: {
  //       start: (event) => {
  //         console.log("start drag", id);
  //       },
  //     },
  //     cursorChecker: (action, interactable, element, interacting) => "default",
  //   });
  //   interact(ref.current!).dropzone({
  //     ondrop: (event) => {
  //       console.log("drop", event);
  //       dispatch(
  //         updateManyPin([
  //           {
  //             id: event.relatedTarget.id,
  //             changes: {
  //               to: {
  //                 pinId: event.target.id,
  //               },
  //             },
  //           },
  //           {
  //             id: event.target.id,
  //             changes: {
  //               to: {
  //                 pinId: event.relatedTarget.id,
  //               },
  //             },
  //           },
  //         ])
  //       );
  //     },
  //   });
  // }, [dispatch, id]);

  return (
    <g ref={ref} id={id}>
      <circle cx={pin?.x} cy={pin?.y} r={5} />
    </g>
  );
});

export default Pin;
