const renderFreehand = (
  canvas: fabric.Canvas,
  currentColor: string,
  currentBrushSize: number
) => {
  canvas.on('mouse:down', function () {
    canvas.freeDrawingBrush.color = currentColor;
    canvas.freeDrawingBrush.width = currentBrushSize;
    canvas.isDrawingMode = true;
    canvas.renderAll();
  });
  canvas.on('mouse:move', () => {
    canvas.freeDrawingBrush.color = currentColor;
    canvas.freeDrawingBrush.width = currentBrushSize;
    canvas.isDrawingMode = true;
    canvas.renderAll();
  });
  canvas.on('mouse:up', () => {
    canvas.isDrawingMode = false;
    canvas.renderAll();
  });
};

export default renderFreehand;
