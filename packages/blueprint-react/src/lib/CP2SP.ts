//convert client position to svg position
const CP2SP = (
  clientPoint: { x: number; y: number },
  svgInfo: { x: number; y: number; k: number }
): { x: number; y: number } => {
  return { x: 1, y: 1 };
};

export default CP2SP;
