import React from "react";
import { useSelector } from "react-redux";
import { chessmenSelector } from "../reducer/chessmen";
import { RootState } from "../reducer";

import Pin from "./Pin";
interface IProps {
  id: string;
}

const Chessman = (props: IProps) => {
  const { id } = props;

  const chessman = useSelector((state: RootState) =>
    chessmenSelector.selectById(state, id)
  );

  return (
    <g>
      {chessman?.pins.map((pinId) => (
        <Pin id={id} key={pinId} />
      ))}
    </g>
  );
};

export default Chessman;
