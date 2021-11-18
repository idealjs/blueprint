import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../reducer";
import { pinsSelector, updateManyPin } from "../reducer/pins";

interface IProps {
  id: string;
  svgRef: React.RefObject<SVGSVGElement>;
}

const Pin = memo((props: IProps) => {
  const { id } = props;
  const ref = useRef<SVGGElement>(null);
  const dispatch = useDispatch();
  const pin = useSelector((state: RootState) =>
    pinsSelector.selectById(state, id)
  );

  // useEffect(() => {
  //   interact(ref.current!).draggable({
  //     listeners: {
  //       start: (event) => {
  //         console.log("start drag", id);
  //       },
  //     },
  //     cursorChecker: (action, interactable, element, interacting) => "default",
  //   });
  //   interact(ref.current!).dropzone({
  //     ondrop: (event) => {
  //       console.log("drop", event);
  //       dispatch(
  //         updateManyPin([
  //           {
  //             id: event.relatedTarget.id,
  //             changes: {
  //               to: {
  //                 pinId: event.target.id,
  //               },
  //             },
  //           },
  //           {
  //             id: event.target.id,
  //             changes: {
  //               to: {
  //                 pinId: event.relatedTarget.id,
  //               },
  //             },
  //           },
  //         ])
  //       );
  //     },
  //   });
  // }, [dispatch, id]);

  return (
    <g ref={ref} id={id}>
      <circle cx={pin?.x} cy={pin?.y} r={5} />
    </g>
  );
});

export default Pin;
