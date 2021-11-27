import {
  BASE_TYPE,
  Chessboard,
  Chessman,
  DataTypeManager,
  IChessman,
  IPin,
  PIN_TYPE,
} from "@idealjs/blueprint";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";

import { addChessman } from "../../reducer/chessmen";
import { addManyPin } from "../../reducer/pins";

export const useAddChessman = () => {
  const dispatch = useDispatch();

  return useCallback(
    (x, y) => {
      let chessman: IChessman = {
        id: uniqid(),
        type: {
          isArray: false,
          dataType: {
            id: uniqid(),
            type: BASE_TYPE.BOOLEAN,
          },
        },
        pinMap: new Map(),
        x,
        y,
      };

      let pin1: IPin = {
        id: uniqid(),
        type: PIN_TYPE.IN,
        x: 10,
        y: 30,
        parent: chessman,
        connected: new Map(),
      };

      let pin2: IPin = {
        id: uniqid(),
        type: PIN_TYPE.IN,
        x: 110,
        y: 30,
        parent: chessman,
        connected: new Map(),
      };
      chessman.pinMap.set(pin1.id, pin1);
      chessman.pinMap.set(pin2.id, pin2);

      dispatch(addChessman(chessman));

      dispatch(addManyPin([pin1, pin2]));
    },
    [dispatch]
  );
};
