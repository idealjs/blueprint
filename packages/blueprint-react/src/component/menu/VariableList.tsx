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
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <p>Variable List</p>
        <div>
          <button
            style={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => {
              setAddingVariable(true);
            }}
          >
            +
          </button>
        </div>
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
            <div>{variable.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default VariableList;
