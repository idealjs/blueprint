import { DND_EVENT } from "@idealjs/drag-drop";
import { useDnd } from "@idealjs/drag-drop-react";
import React, { useEffect, useRef } from "react";

const MenuItem = () => {
  const ref = useRef(null);
  const dnd = useDnd();

  useEffect(() => {
    if (ref.current) {
      dnd
        .draggable(ref.current, { item: { id: "menu-chessman" } })
        .addListener(DND_EVENT.DRAG, () => {
          console.log("test test drag item");
        });
    }
  }, [dnd]);

  // useEffect(() => {
  //   interact(ref.current!).draggable({
  //     cursorChecker: (action, interactable, element, interacting) => {
  //       return interacting ? "grabbing" : "grab";
  //     },
  //   });
  // }, []);

  return (
    <div ref={ref} className="menuItem" style={{ touchAction: "none" }}>
      Item
    </div>
  );
};

export default MenuItem;
