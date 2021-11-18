import { Chessboard } from "@idealjs/blueprint";
import DataTypeManager from "@idealjs/blueprint/src/DataTypeManager";
import { configureStore } from "@reduxjs/toolkit";
import { createContext, FC, useContext, useMemo } from "react";
import { Provider } from "react-redux";

import rootReducer from "../reducer";

const store = configureStore({
  reducer: rootReducer,
});

const BoardProvider: FC = (props) => {
  const { children } = props;
  const value = useMemo(() => new Chessboard(new DataTypeManager(), {}), []);
  return (
    <context.Provider value={value}>
      <Provider store={store}>{children}</Provider>
    </context.Provider>
  );
};

export default BoardProvider;

const context = createContext(new Chessboard(new DataTypeManager(), {}));

export const useBoard = () => {
  return useContext(context);
};
