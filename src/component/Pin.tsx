import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../reducer";
import { pinsSelector } from "../reducer/pins";

interface IProps {
  id: string;
  svgRef: React.RefObject<SVGSVGElement>;
}

const Pin = (props: IProps) => {
  const { id } = props;
  const pin = useSelector((state: RootState) =>
    pinsSelector.selectById(state, id)
  );

  return <g></g>;
};

export default Pin;
