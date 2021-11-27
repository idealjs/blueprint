import { PIN_TYPE } from "@idealjs/blueprint";
import { useSelector } from "react-redux";

import { RootState } from "../reducer";
import { chessmenSelector } from "../reducer/chessmen";
import { pinsSelector } from "../reducer/pins";

const PathLayer = () => {
  const lines = useSelector((state: RootState) => {
    const chessmen = chessmenSelector.selectAll(state);
    return chessmen.flatMap((chessman) =>
      chessman.pinIds
        .filter((pinId) => {
          console.log("test test1");
          const pin = pinsSelector.selectById(state, pinId);
          console.log(
            "test test1",
            pinId,
            pin?.type === PIN_TYPE.OUT,
            pin?.connectedIds,
            pin?.type === PIN_TYPE.OUT && pin.connectedIds.length !== 0
          );

          return pin?.type === PIN_TYPE.OUT && pin.connectedIds.length !== 0;
        })
        .map((pinId) => {
          const pin = pinsSelector.selectById(state, pinId);
          if (!pin) {
            return "";
          }
          const targetPin = pinsSelector.selectById(state, pin.connectedIds[0]);
          if (!targetPin) {
            return "";
          }

          const targetChessman = chessmenSelector.selectById(
            state,
            targetPin.parentId
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
        <path d={d} key={d} style={{ stroke: "orange" }} />
      ))}
    </g>
  );
};

export default PathLayer;
