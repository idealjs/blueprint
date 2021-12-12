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
  const dataType = useSelector((state: RootState) => {
    if (state.selectedDataTypeId == null) {
      return;
    }
    return dataTypesSelector.selectById(state, state.selectedDataTypeId);
  });

  const dispatch = useDispatch();

  const typeRender = useMemo(() => {
    if (dataType && isDataTypeBaseType(dataType)) {
      return dataType._type.value;
    }
    if (dataType && isDataTypeFunctionType(dataType)) {
      return null;
    }
    if (dataType && isDataTypeObjectType(dataType)) {
      return null;
    }
  }, [dataType]);

  const category = useMemo(() => {
    if (dataType && isDataTypeBaseType(dataType)) {
      return DATATYPE_CATEGORY.BASE;
    }
    if (dataType && isDataTypeFunctionType(dataType)) {
      return DATATYPE_CATEGORY.FUNCTION;
    }
    if (dataType && isDataTypeObjectType(dataType)) {
      return DATATYPE_CATEGORY.OBJECT;
    }
  }, [dataType]);

  return dataType ? (
    <div>
      <div>name:{dataType?._name}</div>
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
          // if (dataType?._id == null || type == null) {
          //   return;
          // }
          // dispatch(
          //   updateDataType({
          //     id: dataType._id,
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
