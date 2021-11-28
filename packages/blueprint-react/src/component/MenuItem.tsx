import { useDnd } from "@idealjs/drag-drop-react";
import { useEffect, useRef } from "react";

const MenuItem = () => {
  const ref = useRef(null);
  const dnd = useDnd();

  useEffect(() => {
    if (ref.current) {
      dnd.draggable(ref.current, { item: { type: "menu-chessman" } });
    }
  }, [dnd]);

  return (
    <div
      ref={ref}
      className="menuItem"
      style={{ touchAction: "none", cursor: "grab" }}
    >
      Item
    </div>
  );
};

export default MenuItem;
