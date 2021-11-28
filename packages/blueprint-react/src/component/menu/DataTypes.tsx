import { BASE_TYPE } from "@idealjs/blueprint";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";

import { RootState } from "../../reducer";
import { datatypesSelector, upsertDataType } from "../../reducer/dataTypes";
import AddType from "./AddType";
import DataTypePreview from "./DataTypePreview";

const DataTypes = () => {
  const [addingType, setAddingType] = useState(false);
  const dataTypes = useSelector((state: RootState) => {
    return datatypesSelector.selectAll(state);
  });
  const dispatch = useDispatch();

  return (
    <div>
      <div
        style={{ cursor: "pointer", userSelect: "none" }}
        onClick={() => {
          setAddingType(true);
        }}
      >
        add new type
      </div>
      {addingType && (
        <AddType
          onCancel={() => {
            setAddingType(false);
          }}
          onConfirm={(name) => {
            dispatch(
              upsertDataType({
                id: uniqid(),
                name,
                isArray: false,
                type: BASE_TYPE.ANY,
              })
            );
            setAddingType(false);
          }}
        />
      )}
      {dataTypes.map((dataType, index) => {
        return (
          <DataTypePreview key={dataType.id} id={dataType.id}></DataTypePreview>
        );
      })}
    </div>
  );
};

export default DataTypes;
