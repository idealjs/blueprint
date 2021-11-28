import { useSelector } from "react-redux";

import { RootState } from "../../reducer";
import { datatypesSelector } from "../../reducer/dataTypes";
import DataTypePreview from "./DataTypePreview";

const DataTypes = () => {
  const dataTypes = useSelector((state: RootState) => {
    return datatypesSelector.selectAll(state);
  });
  return (
    <div>
      <div style={{ cursor: "pointer", userSelect: "none" }}>add new type</div>
      {dataTypes.map((dataType, index) => {
        return (
          <DataTypePreview key={dataType.id} id={dataType.id}></DataTypePreview>
        );
      })}
    </div>
  );
};

export default DataTypes;
