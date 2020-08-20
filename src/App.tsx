import "./App.css";

import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import uniqid from "uniqid";

import Chessboard from "./component/Chessboard";
import { addChessman, CHESSMAN_TYPE } from "./reducer/chessmen";
import { addManyPin, PIN_DIRECTION } from "./reducer/pins";

function App() {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    const chessmanId = uniqid(`${CHESSMAN_TYPE.FUNCTION}_`);
    const pinInId = uniqid(`${PIN_DIRECTION.IN}_`);
    const pinOutId = uniqid(`${PIN_DIRECTION.OUT}_`);
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
          type: PIN_DIRECTION.IN,
          x: 10,
          y: 15,
          parentId: chessmanId,
        },
        {
          id: pinOutId,
          type: PIN_DIRECTION.OUT,
          x: 30,
          y: 15,
          parentId: chessmanId,
        },
      ])
    );
  }, [dispatch]);
  return (
    <div className="App" >
      <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
        <div style={{ width: "200px", backgroundColor: "#5e5ebb" }}>
          test
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1 }}>
            <Chessboard />
          </div>
          <div>
            <button onClick={onClick}>Add chessman</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
