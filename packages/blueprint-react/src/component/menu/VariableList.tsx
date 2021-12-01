import { BASE_TYPE } from "@idealjs/blueprint";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uniqid from "uniqid";

import { RootState } from "../../reducer";
import { setSelectedVariableId } from "../../reducer/selectedVariableId";
import { upsertVariable, variablesSelector } from "../../reducer/variables";
import AddThings from "./AddThings";

const VariableList = () => {
  const [addingVariable, setAddingVariable] = useState(false);
  const variables = useSelector((state: RootState) => {
    return variablesSelector.selectAll(state);
  });
  const dispatch = useDispatch();
  const selectVariable = useCallback(
    (id: string) => {
      dispatch(setSelectedVariableId(id));
    },
    [dispatch]
  );
  return (
    <div>
      <div
        style={{ cursor: "pointer", userSelect: "none" }}
        onClick={() => {
          setAddingVariable(true);
        }}
      >
        add new variable
      </div>
      {addingVariable && (
        <AddThings
          onCancel={() => {
            setAddingVariable(false);
          }}
          onConfirm={(name) => {
            dispatch(
              upsertVariable({
                id: uniqid(),
                name,
                dataTypeId: BASE_TYPE.ANY,
              })
            );
            setAddingVariable(false);
          }}
        />
      )}
      {variables.map((variable) => {
        return (
          <div
            key={variable.id}
            onClick={() => {
              selectVariable(variable.id);
            }}
            style={{ userSelect: "none" }}
          >
            <div>id: {variable.id}</div>
            <div>name: {variable.name}</div>
            <div>type: {variable.dataTypeId}</div>
          </div>
        );
      })}
    </div>
  );
};

export default VariableList;