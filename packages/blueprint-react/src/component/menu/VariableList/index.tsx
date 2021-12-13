import { BASE_TYPE } from "@idealjs/blueprint";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../reducer";
import { addVariable, variablesSelector } from "../../../reducer/variables";
import AddThings from "../AddThings";
import Variable from "./Variable";

const VariableList = () => {
  const [addingVariable, setAddingVariable] = useState(false);
  const variables = useSelector((state: RootState) => {
    return variablesSelector.selectAll(state);
  });

  const dispatch = useDispatch();

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
              addVariable({
                id: name,
                name,
                dataTypeId: BASE_TYPE.ANY,
              })
            );
            setAddingVariable(false);
          }}
        />
      )}
      {variables.map((variable) => {
        return <Variable key={variable.id} variableId={variable.id} />;
      })}
    </div>
  );
};

export default VariableList;
