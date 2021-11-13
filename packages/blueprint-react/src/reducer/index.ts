import { combineReducers } from "@reduxjs/toolkit";

import chessboard from "./chessboard";
import chessmen from "./chessmen";
import pins from "./pins";
import tags from "./tags";

const rootReducer = combineReducers({
  chessboard,
  chessmen,
  pins,
  tags,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
