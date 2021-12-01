import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../reducer";
import { chessmenSelector, updateChessman } from "../../reducer/chessmen";
import { dataTypesSelector } from "../../reducer/dataTypes";

const SelectedChessman = () => {
  const selectedChessman = useSelector((state: RootState) => {
    if (state.selectedChessmanId == null) {
      return;
    }
    return chessmenSelector.selectById(state, state.selectedChessmanId);
  });

  const dataType = useSelector((state: RootState) => {
    if (selectedChessman == null) {
      return;
    }
    return dataTypesSelector.selectById(state, selectedChessman.dataTypeId);
  });

  const dataTypes = useSelector((state: RootState) => {
    return dataTypesSelector.selectAll(state);
  });

  const dispatch = useDispatch();

  return selectedChessman ? (
    <div>selectedChessman: {selectedChessman?.id}</div>
  ) : (
    <div>no chessman selected</div>
  );
};

export default SelectedChessman;
