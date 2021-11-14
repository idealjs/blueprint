import "./App.css";

import { Chessboard } from "@idealjs/blueprint";
import { useEffect, useRef } from "react";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    new Chessboard(ref.current!);
  }, []);
  return (
    <div className="App" ref={ref}>
      hello
    </div>
  );
}

export default App;
