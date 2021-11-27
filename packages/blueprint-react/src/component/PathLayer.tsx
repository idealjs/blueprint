import { PIN_TYPE } from "@idealjs/blueprint";
import { memo } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../reducer";
import { chessmenSelector } from "../reducer/chessmen";

const PathLayer = memo(() => {
  const lines = useSelector((state: RootState) => {
    const chessmen = chessmenSelector.selectAll(state);
    return chessmen.flatMap((chessman) =>
      Array.from(chessman.pinMap.values())
        .filter((pin) => {
          return pin?.type === PIN_TYPE.OUT && pin.connected.size !== 0;
        })
        .map((pin) => {
          const targetPin = Array.from(pin?.connected?.values())[0];

          const targetChessman = targetPin.parent;

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
        <path d={d} key={d} style={{ stroke: "orange" }} />
      ))}
    </g>
  );
});

export default PathLayer;
