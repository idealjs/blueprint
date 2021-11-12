import "./App.css";

import React from "react";

import Chessboard from "./component/Chessboard";
import MenuItem from "./component/MenuItem";

function App() {
  return (
    <div className="App">
      <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
        <div style={{ width: "200px", backgroundColor: "#5e5ebb" }}>
          test
          <MenuItem />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1 }}>
            <Chessboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
