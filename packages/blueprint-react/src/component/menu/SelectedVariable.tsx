import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../reducer";
import { dataTypesSelector } from "../../reducer/dataTypes";
import { updateVariable, variablesSelector } from "../../reducer/variables";

const VariableMenu = () => {
  const selectedVariable = useSelector((state: RootState) => {
    if (state.selectedVariableId == null) {
      return;
    }
    return variablesSelector.selectById(state, state.selectedVariableId);
  });

  const dataType = useSelector((state: RootState) => {
    if (selectedVariable == null) {
      return;
    }
    return dataTypesSelector.selectById(state, selectedVariable.dataTypeId);
  });

  const dataTypes = useSelector((state: RootState) => {
    return dataTypesSelector.selectAll(state);
  });

  const dispatch = useDispatch();

  return selectedVariable ? (
    <div>
      <div>selectedVariable: {selectedVariable.name}</div>
      <select
        value={dataType?._id}
        onChange={(e) => {
          dispatch(
            updateVariable({
              id: selectedVariable.id,
              changes: {
                dataTypeId: e.target.value,
              },
            })
          );
        }}
      >
        {dataTypes.map((dataType) => {
          return (
            <option key={dataType._id} value={dataType._id}>
              {dataType._name}
            </option>
          );
        })}
      </select>
    </div>
  ) : null;
};

export default VariableMenu;
