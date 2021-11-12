import interact from "interactjs";
import React, { useEffect, useRef } from "react";

const MenuItem = () => {
  const ref = useRef(null);

  useEffect(() => {
    interact(ref.current!).draggable({
      cursorChecker: (action, interactable, element, interacting) => {
        return interacting ? "grabbing" : "grab";
      },
    });
  }, []);

  return (
    <div ref={ref} className="menuItem" style={{ touchAction: "none" }}>
      Item
    </div>
  );
};

export default MenuItem;
