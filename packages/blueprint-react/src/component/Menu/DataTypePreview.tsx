import { useSelector } from "react-redux";

import { RootState } from "../../reducer";
import { datatypesSelector } from "../../reducer/dataTypes";

interface IProps {
  id: string;
}

const DataTypePreview = (props: IProps) => {
  const { id } = props;
  const dataType = useSelector((state: RootState) => {
    return datatypesSelector.selectById(state, id);
  });
  return <div style={{ userSelect: "none" }}>{dataType?.name}</div>;
};

export default DataTypePreview;
