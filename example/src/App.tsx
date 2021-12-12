import "./App.css";

import {
  Chessboard,
  DataTypeList,
  SelectedDataType,
  SelectedVariable,
  VariableList,
} from "@idealjs/blueprint-react";

function App() {
  return (
    <div className="App">
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          display: "flex",
        }}
      >
        <div
          style={{
            width: "200px",
            backgroundColor: "#5e5ebb",
            position: "absolute",
          }}
        >
          <VariableList />
        </div>

        <div
          style={{
            left: "210px",
            width: "200px",
            backgroundColor: "#5e5ebb",
            position: "absolute",
          }}
        >
          <DataTypeList />
        </div>
        <div
          style={{
            width: "200px",
            backgroundColor: "#5e5ebb",
            position: "absolute",
            right: "0px",
          }}
        >
          <SelectedVariable />
        </div>
        <div
          style={{
            width: "200px",
            backgroundColor: "#5e5ebb",
            position: "absolute",
            right: "0px",
            top: "50px",
          }}
        >
          <SelectedDataType />
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
