import { combineReducers } from "@reduxjs/toolkit";

import chessboard from "./chessboard";
import chessmen from "./chessmen";
import pins from "./pins";

const rootReducer = combineReducers({
  chessboard,
  chessmen,
  pins,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
