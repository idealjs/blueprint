import { useSelector } from "react-redux";

import { RootState } from "../../reducer";
import { dataTypesSelector } from "../../reducer/dataTypes";

interface IProps {
  id: string;
}

const DataTypePreview = (props: IProps) => {
  const { id } = props;
  const dataType = useSelector((state: RootState) => {
    return dataTypesSelector.selectById(state, id);
  });
  return <div style={{ userSelect: "none" }}>{dataType?.name}</div>;
};

export default DataTypePreview;
