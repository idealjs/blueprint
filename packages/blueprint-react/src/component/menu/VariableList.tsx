import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../reducer";
import { setSelectedVariableId } from "../../reducer/selectedVariableId";

const VariableList = () => {
  const dispatch = useDispatch();

  return (
    <div>
      {/* {ids.map((id) => {
        return (
          <div
            key={id}
            style={{ userSelect: "none" }}
            onClick={() => {
              dispatch(setSelectedVariableId(id));
            }}
          >
            {id}
          </div>
        );
      })} */}
      <div
        style={{
          userSelect: "none",
        }}
      ></div>
    </div>
  );
};

export default VariableList;
