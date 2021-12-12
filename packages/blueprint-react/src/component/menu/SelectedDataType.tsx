import { BASE_TYPE, PartialRecord } from "@idealjs/blueprint";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../reducer";
import {
  dataTypesSelector,
  IDataTypeState,
  IFunctionTypeState,
  isDataTypeBaseType,
  isDataTypeFunctionType,
  isDataTypeObjectType,
  updateDataType,
} from "../../reducer/dataTypes";

export enum DATATYPE_CATEGORY {
  BASE = "base",
  FUNCTION = "function",
  OBJECT = "object",
  ARRAY = "array",
}

const DataType = () => {
  const selectedDataType = useSelector((state: RootState) => {
    if (state.selectedDataTypeId == null) {
      return;
    }
    return dataTypesSelector.selectById(state, state.selectedDataTypeId);
  });

  const dispatch = useDispatch();

  const typeRender = useMemo(() => {
    if (selectedDataType && isDataTypeBaseType(selectedDataType)) {
      return selectedDataType._type.value;
    }
    if (selectedDataType && isDataTypeFunctionType(selectedDataType)) {
      return null;
    }
    if (selectedDataType && isDataTypeObjectType(selectedDataType)) {
      return null;
    }
  }, [selectedDataType]);

  const category = useMemo(() => {
    if (selectedDataType && isDataTypeBaseType(selectedDataType)) {
      return DATATYPE_CATEGORY.BASE;
    }
    if (selectedDataType && isDataTypeFunctionType(selectedDataType)) {
      return DATATYPE_CATEGORY.FUNCTION;
    }
    if (selectedDataType && isDataTypeObjectType(selectedDataType)) {
      return DATATYPE_CATEGORY.OBJECT;
    }
  }, [selectedDataType]);

  return selectedDataType ? (
    <div>
      <div>name:{selectedDataType?._name}</div>
      <select
        value={category}
        onChange={(e) => {
          // let type:
          //   | BASE_TYPE
          //   | IFunctionTypeState
          //   | PartialRecord<string, IDataTypeState>;
          // switch (e.target.value) {
          //   case DATATYPE_CATEGORY.BASE: {
          //     type = BASE_TYPE.STRING;
          //     break;
          //   }
          //   case DATATYPE_CATEGORY.FUNCTION: {
          //     type = {
          //       _params: {},
          //     };
          //     break;
          //   }
          //   case DATATYPE_CATEGORY.OBJECT: {
          //     type = {};
          //     break;
          //   }
          //   default: {
          //     type = BASE_TYPE.STRING;
          //   }
          // }
          // if (selectedDataType?._id == null || type == null) {
          //   return;
          // }
          // dispatch(
          //   updateDataType({
          //     id: selectedDataType._id,
          //     changes: {
          //       _type: type,
          //     },
          //   })
          // );
        }}
      >
        {Object.values(DATATYPE_CATEGORY).map((category) => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>
      <div>{typeRender}</div>
    </div>
  ) : null;
};

export default DataType;
