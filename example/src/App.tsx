import "./App.css";

import {
  Chessboard,
  ChessmanList,
  ChessmanMenu,
  DataTypes,
  MenuItem,
} from "@idealjs/blueprint-react";

function App() {
  return (
    <div className="App">
      <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
        <div style={{ width: "200px", backgroundColor: "#5e5ebb" }}>
          <MenuItem />
          <DataTypes />
          <ChessmanList />
          <ChessmanMenu />
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
