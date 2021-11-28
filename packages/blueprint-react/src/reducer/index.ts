import { combineReducers } from "@reduxjs/toolkit";

import chessboard from "./chessboard";
import chessmen from "./chessmen";
import dataTypes from "./dataTypes";
import pins from "./pins";

const rootReducer = combineReducers({
  chessboard,
  chessmen,
  dataTypes,
  pins,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
