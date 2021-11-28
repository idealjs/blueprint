import { combineReducers } from "@reduxjs/toolkit";

import chessboard from "./chessboard";
import chessmen from "./chessmen";
import dataTypes from "./dataTypes";
import pins from "./pins";
import selectedChessmanId from "./selectedChessmanId";

const rootReducer = combineReducers({
  chessboard,
  chessmen,
  dataTypes,
  pins,
  selectedChessmanId,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
