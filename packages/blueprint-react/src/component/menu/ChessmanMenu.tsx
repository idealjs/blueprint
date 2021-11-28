import { useSelector } from "react-redux";

import { RootState } from "../../reducer";
import { chessmenSelector } from "../../reducer/chessmen";

const ChessmanMenu = () => {
  const selectedChessman = useSelector((state: RootState) => {
    if (state.selectedChessmanId == null) {
      return;
    }
    return chessmenSelector.selectById(state, state.selectedChessmanId);
  });

  return selectedChessman ? (
    <div>selectedChessman: {selectedChessman?.id}</div>
  ) : (
    <div>no chessman selected</div>
  );
};

export default ChessmanMenu;
