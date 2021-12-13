import {
  ArrayTypeJSON,
  BASE_TYPE,
  BaseTypeJSON,
  FunctionTypeJSON,
  ObjectTypeJSON,
} from "@idealjs/blueprint";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../reducer";
import {
  dataTypesSelector,
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
          let type:
            | BaseTypeJSON
            | ArrayTypeJSON
            | ObjectTypeJSON
            | FunctionTypeJSON;
          switch (e.target.value) {
            case DATATYPE_CATEGORY.BASE: {
              type = {
                value: BASE_TYPE.ANY,
                _type: "BaseType",
              };
              break;
            }
            case DATATYPE_CATEGORY.FUNCTION: {
              type = {
                value: {
                  parameters: [],
                },
                _type: "FunctionType",
              };
              break;
            }
            case DATATYPE_CATEGORY.OBJECT: {
              type = {
                value: {},
                _type: "ObjectType",
              };
              break;
            }
            case DATATYPE_CATEGORY.ARRAY: {
              type = {
                value: {
                  dimension: 1,
                  type: {
                    _id: BASE_TYPE.ANY,
                    _name: BASE_TYPE.ANY,
                    _type: {
                      value: BASE_TYPE.ANY,
                      _type: "BaseType",
                    },
                  },
                },
                _type: "ArrayType",
              };
              break;
            }
            default: {
              throw new Error("unexpected category");
            }
          }
          if (selectedDataType?._id == null || type == null) {
            return;
          }
          if (!Object.values(BASE_TYPE).includes(selectedDataType._id as any)) {
            dispatch(
              updateDataType({
                id: selectedDataType._id,
                changes: {
                  _type: type,
                },
              })
            );
          } else {
            console.error("[Error] cannot change base type");
          }
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
