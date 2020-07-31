import "./App.css";

import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";

import Chessboard from "./component/Chessboard";
import { addChessman, CHESSMAN_TYPE } from "./reducer/chessmen";
import { addManyPin, PIN_TYPE } from "./reducer/pins";

function App() {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    const chessmanId = uniqid(`${CHESSMAN_TYPE.FUNCTION}_`);
    const pinInId = uniqid(`${PIN_TYPE.IN}_`);
    const pinOutId = uniqid(`${PIN_TYPE.OUT}_`);
    dispatch(
      addChessman({
        id: chessmanId,
        type: CHESSMAN_TYPE.FUNCTION,
        width: 40,
        height: 30,
        x: Math.random() * 10,
        y: Math.random() * 10,
        pins: [pinInId, pinOutId],
      })
    );

    dispatch(
      addManyPin([
        {
          id: pinInId,
          type: PIN_TYPE.IN,
          x: 10,
          y: 10,
          parentId: chessmanId,
        },
        {
          id: pinOutId,
          type: PIN_TYPE.OUT,
          x: 90,
          y: 10,
          parentId: chessmanId,
        },
      ])
    );
  }, [dispatch]);
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Chessboard />
      <button onClick={onClick}>Add chessman</button>
    </div>
  );
}

export default App;
