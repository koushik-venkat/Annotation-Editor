const renderSelectMode = (canvas: fabric.Canvas) => {
  canvas.isDrawingMode = false;
  canvas.selection = true;
};

export default renderSelectMode;
