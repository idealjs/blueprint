import { useCallback } from "react";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";

import { addChessman, CHESSMAN_TYPE } from "../../reducer/chessmen";
import { addManyPin, PIN_DIRECTION } from "../../reducer/pins";

export const useAddChessman = () => {
  const dispatch = useDispatch();

  return useCallback(
    (x, y) => {
      const chessmanId = uniqid(`${CHESSMAN_TYPE.FUNCTION}_`);
      const pinInId = uniqid(`${PIN_DIRECTION.IN}_`);
      const pinOutId = uniqid(`${PIN_DIRECTION.OUT}_`);

      dispatch(
        addChessman({
          id: chessmanId,
          type: CHESSMAN_TYPE.FUNCTION,
          width: 120,
          height: 90,
          x,
          y,
          border: 5,
          pins: [pinInId, pinOutId],
        })
      );

      dispatch(
        addManyPin([
          {
            id: pinInId,
            type: PIN_DIRECTION.IN,
            x: 10,
            y: 30,
            parentId: chessmanId,
          },
          {
            id: pinOutId,
            type: PIN_DIRECTION.OUT,
            x: 110,
            y: 30,
            parentId: chessmanId,
          },
        ])
      );
    },
    [dispatch]
  );
};
