import { BASE_TYPE } from "@idealjs/blueprint";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../reducer";
import { addDataType, dataTypesSelector } from "../../reducer/dataTypes";
import { setSelectedDataTypeId } from "../../reducer/selectedDataTypeId";
import AddThings from "./AddThings";

const DataTypeList = () => {
  const [addingType, setAddingType] = useState(false);
  const dataTypes = useSelector((state: RootState) => {
    return dataTypesSelector.selectAll(state);
  });
  const selectedDataType = useSelector((state: RootState) => {
    if (state.selectedDataTypeId == null) {
      return;
    }
    return dataTypesSelector.selectById(state, state.selectedDataTypeId);
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
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <p>DataType List</p>
        <div>
          <button
            style={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => {
              setAddingType(true);
            }}
          >
            +
          </button>
        </div>
      </div>

      {addingType && (
        <AddThings
          onCancel={() => {
            setAddingType(false);
          }}
          onConfirm={(name) => {
            dispatch(
              addDataType({
                _id: name,
                _name: name,
                _type: {
                  _type: "BaseType",
                  value: BASE_TYPE.ANY,
                },
              })
            );
            setAddingType(false);
          }}
        />
      )}
      {dataTypes.map((dataType) => {
        return (
          <div
            key={dataType._id}
            onClick={() => {
              selectDataType(dataType._id);
            }}
            style={{
              userSelect: "none",
              border:
                selectedDataType?._id === dataType._id
                  ? "2px solid #000"
                  : undefined,
              margin:
                selectedDataType?._id === dataType._id ? "-2px" : undefined,
            }}
          >
            {dataType?._name}
          </div>
        );
      })}
    </div>
  );
};

export default DataTypeList;
