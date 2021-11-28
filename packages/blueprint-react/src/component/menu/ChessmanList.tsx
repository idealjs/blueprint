import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../reducer";
import { chessmenSelector } from "../../reducer/chessmen";
import { setSelectedChessmanId } from "../../reducer/selectedChessmanId";

const ChessmanList = () => {
  const ids = useSelector((state: RootState) => {
    return chessmenSelector.selectIds(state);
  });
  const dispatch = useDispatch();

  return (
    <div>
      {ids.map((id) => {
        return (
          <div
            key={id}
            style={{ userSelect: "none" }}
            onClick={() => {
              dispatch(setSelectedChessmanId(id));
            }}
          >
            {id}
          </div>
        );
      })}
    </div>
  );
};

export default ChessmanList;
