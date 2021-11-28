import { BASE_TYPE, PIN_TYPE } from "@idealjs/blueprint";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";

import { addChessman, IChessmanState } from "../../reducer/chessmen";
import { IDataTypeState, upsertDataType } from "../../reducer/dataTypes";
import { addManyPin, IPinState } from "../../reducer/pins";

export const useAddChessman = () => {
  const dispatch = useDispatch();

  return useCallback(
    (x, y) => {
      const chessmanId = uniqid(`CHESSMAN_`);
      const pinInId = uniqid(`PIN_`);
      const pinOutId = uniqid(`PIN_`);

      const dataType: IDataTypeState = {
        isArray: false,
        id: BASE_TYPE.BOOLEAN,
        type: BASE_TYPE.BOOLEAN,
      };

      let chessman: IChessmanState = {
        id: chessmanId,
        dataTypeId: dataType.id,
        pinIds: [pinInId, pinOutId],
        x,
        y,
      };

      let pin1: IPinState = {
        id: pinInId,
        type: PIN_TYPE.IN,
        dataTypeId: dataType.id,
        x: 10,
        y: 30,
        parentId: chessmanId,
        connectedIds: [],
      };

      let pin2: IPinState = {
        id: pinOutId,
        type: PIN_TYPE.OUT,
        dataTypeId: dataType.id,
        x: 110,
        y: 30,
        parentId: chessmanId,
        connectedIds: [],
      };

      dispatch(addChessman(chessman));

      dispatch(addManyPin([pin1, pin2]));

      dispatch(upsertDataType(dataType));
    },
    [dispatch]
  );
};
