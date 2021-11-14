import "./App.css";

import { Chessboard, Toolbox } from "@idealjs/blueprint";
import { useEffect, useRef } from "react";

function App() {
  const toolboxRef = useRef<HTMLDivElement>(null);
  const chessboardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    new Chessboard(chessboardRef.current!);
  }, []);

  useEffect(() => {
    new Toolbox(toolboxRef.current!);
  }, []);

  return (
    <div
      className="App"
      style={{ height: "100vh", width: "100vw", display: "flex" }}
    >
      <div ref={toolboxRef}></div>
      <div ref={chessboardRef}></div>
    </div>
  );
}

export default App;
