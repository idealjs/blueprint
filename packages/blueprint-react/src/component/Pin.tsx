import { DND_EVENT, IDropData } from "@idealjs/drag-drop";
import { useDnd } from "@idealjs/drag-drop-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../reducer";
import { IPinState, pinsSelector, updateManyPin } from "../reducer/pins";

interface IProps {
  id: string;
}

const Pin = (props: IProps) => {
  const { id } = props;
  const ref = useRef<SVGGElement>(null);
  const dnd = useDnd();
  const dispatch = useDispatch();
  const pinRef = useRef<IPinState | undefined>(undefined);
  const pin = useSelector((state: RootState) => {
    const pin = pinsSelector.selectById(state, id);
    pinRef.current = pin;
    return pin;
  });

  useEffect(() => {
    if (ref.current) {
      const listenable = dnd.draggable(ref.current, {
        item: { type: "chessman-pin", pin: pinRef.current },
      });

      return () => {
        listenable.removeEleListeners().removeAllListeners();
      };
    }
  }, [dnd]);

  useEffect(() => {
    if (ref.current) {
      const listenable = dnd.droppable(ref.current).addListener(
        DND_EVENT.DROP,
        (
          payload: IDropData<{
            pin: IPinState;
            type: string;
          }>
        ) => {
          if (payload.item?.type === "chessman-pin" && payload.item?.pin) {
            if (pinRef.current?.type === payload.item.pin.type) {
              console.warn("[Warn] pin type should not same");
              return;
            }
            if (pinRef.current?.dataTypeId !== payload.item.pin.dataTypeId) {
              console.warn("[Warn] pin dataType should same");
              return;
            }
            dispatch(
              updateManyPin([
                {
                  id: payload.item.pin.id,
                  changes: {
                    connectedIds: [id],
                  },
                },
                {
                  id: id,
                  changes: {
                    connectedIds: [payload.item.pin.id],
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

  return (
    <g ref={ref} id={id}>
      <circle cx={pin?.x} cy={pin?.y} r={5} />
    </g>
  );
};

export default Pin;
