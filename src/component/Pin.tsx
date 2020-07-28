import React from "react";
import { useSelector } from "react-redux";
import { pinsSelector } from "../reducer/pins";
import { RootState } from "../reducer";

interface IProps {
  id: string;
}

const Pin = (props: IProps) => {
  const { id } = props;
  const pin = useSelector((state: RootState) =>
    pinsSelector.selectById(state, id)
  );

  return <g></g>;
};

export default Pin;
