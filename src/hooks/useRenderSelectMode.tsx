const useRenderSelectMode = () => {
  const handleRenderSelectMode = (canvas: fabric.Canvas) => {
    canvas.isDrawingMode = false;
    canvas.selection = true;

  };
  return { handleRenderSelectMode };
};
export default useRenderSelectMode;
