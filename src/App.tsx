import React, { useEffect, useRef } from "react";
import "./App.css";
import interact from "interactjs";

function App() {
  const ref = useRef<SVGRectElement>(null);

  useEffect(() => {
    interact(ref.current!).draggable({
      listeners: {
        start: () => {
          console.log("start drag");
        },
        move: () => {
          console.log("move drag");
        },
        end: () => {
          console.log("end drag");
        },
      },
    });
  }, []);
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <svg width="100%" height="100%">
        <g>
          <rect ref={ref} width={300} height={300} />
        </g>
      </svg>
    </div>
  );
}

export default App;
