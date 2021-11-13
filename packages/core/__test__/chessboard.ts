import Chessboard from "../src/Chessboard";

it("chessboard test", () => {
  const container = document.createElement("div");

  new Chessboard(container);
  expect(container.childElementCount).toBe(1);
  // const dragListener = dnd.draggable(dragElement, false, {
  //     item: { id: "testDrag" },
  // });
  // const dropListener = dnd.droppable(dropElement);

  // expect(onSpy).toBeCalledTimes(1);
});
