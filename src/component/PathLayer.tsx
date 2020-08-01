import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../reducer";
import { chessmenSelector } from "../reducer/chessmen";
import { PIN_TYPE, pinsSelector } from "../reducer/pins";

const PathLayer = () => {
  const lines = useSelector((state: RootState) => {
    const chessmen = chessmenSelector.selectAll(state);
    return chessmen.flatMap((chessman) =>
      chessman.pins
        .filter((pinId) => {
          const pin = pinsSelector.selectById(state, pinId);
          return pin?.type === PIN_TYPE.OUT && pin.to != null;
        })
        .map((pinId) => {
          const pin = pinsSelector.selectById(state, pinId);
          const targetPin = pinsSelector.selectById(state, pin?.to?.pinId!);
          const targetChessman = chessmenSelector.selectById(
            state,
            targetPin?.parentId!
          );
          const x1 = pin?.x! + chessman.x;

          const y1 = pin?.y! + chessman.y;

          const x2 = targetPin?.x! + targetChessman?.x!;

          const y2 = targetPin?.y! + targetChessman?.y!;

          return `M ${x1} ${y1} L ${x2} ${y2}`;
        })
    );
  });

  return (
    <g>
      {lines.map((d) => (
        <path d={d} style={{ stroke: "orange" }} />
      ))}
    </g>
  );
};

export default PathLayer;
