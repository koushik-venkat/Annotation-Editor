import hexToRGB from './hexToRGB';
import resetEventHandlers from './resetEventHandlers';
import clearCanvas from './clearCanvas';
import renderRectangle from './renderRectangle';
import renderCircle from './renderCircle';
import renderFreehand from './renderFreehand';
import renderTriangle from './renderTriangle';
import renderEllipse from './renderEllipse';
import renderSelectMode from './renderSelectMode';
import renderLine from './renderLine';

const setCanvasEvents = (
  canvas: fabric.Canvas,
  currentMode: string,
  currentColor: string,
  currentBrushSize: number,
  fillShape: 0 | 1
) => {
  if (!canvas || !currentMode) return;

  const rgbValue = hexToRGB(currentColor);
  resetEventHandlers(canvas);

  if (currentMode === 'clear') {
    canvas.isDrawingMode = false;
    clearCanvas(canvas);
  } else if (currentMode === 'rectangle') {
    renderRectangle(
      canvas,
      currentColor,
      currentBrushSize,
      rgbValue,
      fillShape
    );
  } else if (currentMode === 'circle') {
    renderCircle(canvas, currentColor, currentBrushSize, rgbValue, fillShape);
  } else if (currentMode === 'freehand') {
    renderFreehand(canvas, currentColor, currentBrushSize);
  } else if (currentMode === 'triangle') {
    renderTriangle(canvas, currentColor, currentBrushSize, rgbValue, fillShape);
  } else if (currentMode === 'ellipse') {
    renderEllipse(canvas, currentColor, currentBrushSize, rgbValue, fillShape);
  } else if (currentMode === 'select') {
    renderSelectMode(canvas);
  } else if (currentMode === 'line') {
    renderLine(canvas, currentColor, currentBrushSize, rgbValue);
  }
};

export default setCanvasEvents;
