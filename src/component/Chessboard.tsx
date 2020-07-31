import React, { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../reducer";
import { chessmenSelector } from "../reducer/chessmen";
import Chessman from "./Chessman";

const Chessboard: FC = () => {
  const chessmenIds = useSelector((state: RootState) =>
    chessmenSelector.selectIds(state)
  );

  return (
    <svg height="50%" width="50%">
      {chessmenIds.map((chessmanId) => (
        <Chessman id={chessmanId} key={chessmanId} />
      ))}
    </svg>
  );
};

export default Chessboard;
