import { useSelector } from "react-redux";

import { RootState } from "../../reducer";
import { datatypesSelector } from "../../reducer/dataTypes";

interface IProps {
  id: string;
}

const DataType = (props: IProps) => {
  const { id } = props;
  const dataType = useSelector((state: RootState) => {
    return datatypesSelector.selectById(state, id);
  });
  return <div></div>;
};

export default DataType;
