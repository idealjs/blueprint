import { BASE_TYPE } from "@idealjs/blueprint";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";

import { RootState } from "../../reducer";
import { dataTypesSelector, upsertDataType } from "../../reducer/dataTypes";
import { setSelectedDataTypeId } from "../../reducer/selectedDataTypeId";
import AddThings from "./AddThings";

const DataTypeList = () => {
  const [addingType, setAddingType] = useState(false);
  const dataTypes = useSelector((state: RootState) => {
    return dataTypesSelector.selectAll(state);
  });
  const dispatch = useDispatch();
  const selectDataType = useCallback(
    (id: string) => {
      dispatch(setSelectedDataTypeId(id));
    },
    [dispatch]
  );

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
        <AddThings
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
      {dataTypes.map((dataType) => {
        return (
          <div
            key={dataType.id}
            onClick={() => {
              selectDataType(dataType.id);
            }}
            style={{ userSelect: "none" }}
          >
            {dataType?.name}
          </div>
        );
      })}
    </div>
  );
};

export default DataTypeList;
