import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../reducer";
import { setSelectedVariableId } from "../../../reducer/selectedVariableId";
import { variablesSelector } from "../../../reducer/variables";

interface IProps {
  variableId: string;
}
const Variable = (props: IProps) => {
  const { variableId } = props;
  const dispatch = useDispatch();

  const variable = useSelector((state: RootState) => {
    return variablesSelector.selectById(state, variableId);
  });

  const selectedVariable = useSelector((state: RootState) => {
    if (state.selectedVariableId == null) {
      return;
    }
    return variablesSelector.selectById(state, state.selectedVariableId);
  });

  const selectVariable = useCallback(
    (id: string) => {
      dispatch(setSelectedVariableId(id));
    },
    [dispatch]
  );

  console.log("test test", variable);

  return variable ? (
    <div
      onClick={() => {
        selectVariable(variable.id);
      }}
      style={{
        userSelect: "none",
        border:
          selectedVariable?.id === variable.id ? "2px solid #000" : undefined,
        margin: selectedVariable?.id === variable.id ? "-2px" : undefined,
      }}
    >
      <div>{variable.name}</div>
    </div>
  ) : null;
};

export default Variable;
