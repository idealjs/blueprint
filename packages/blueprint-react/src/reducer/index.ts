import { combineReducers } from "@reduxjs/toolkit";

import chessboard from "./chessboard";
import chessmen from "./chessmen";
import dataTypes from "./dataTypes";
import pins from "./pins";
import selectedChessmanId from "./selectedChessmanId";
import selectedDataTypeId from "./selectedDataTypeId";
import selectedVariableId from "./selectedVariableId";
import variables from "./variables";

const rootReducer = combineReducers({
  chessboard,
  chessmen,
  dataTypes,
  pins,
  selectedChessmanId,
  selectedDataTypeId,
  selectedVariableId,
  variables,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
