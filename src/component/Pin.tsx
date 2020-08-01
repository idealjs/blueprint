import interact from "interactjs";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../reducer";
import { pinsSelector } from "../reducer/pins";

interface IProps {
  id: string;
  svgRef: React.RefObject<SVGSVGElement>;
}

const Pin = (props: IProps) => {
  const { id } = props;
  const ref = useRef<SVGGElement>(null);

  const pin = useSelector((state: RootState) =>
    pinsSelector.selectById(state, id)
  );

  useEffect(() => {
    interact(ref.current!).draggable({
      listeners: {
        start: (event) => {
          console.log("start drag", id);
        },
      },
      cursorChecker: (action, interactable, element, interacting) => "default",
    });
    interact(ref.current!).dropzone({
      ondrop: (event) => {
        console.log("ondrop", event, event.relatedTarget.id, event.target.id);
      },
    });
  }, [id]);

  return (
    <g ref={ref} id={id}>
      <circle cx={pin?.x} cy={pin?.y} r={5} />
    </g>
  );
};

export default Pin;
