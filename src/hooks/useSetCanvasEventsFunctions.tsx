import hexToRGB from '../utils/hexToRGB';
import resetEventHandlers from '../utils/resetEventHandlers';
import useRenderCircle from './useRenderCircle';
import useRenderEllipse from './useRenderEllipse';
import useRenderTriangle from './useRenderTriangle';
import useRenderRectangle from './useRenderRectangle';
import useRenderLine from './useRenderLine';
import useClearCanvas from './useClearCanvas';
import useRenderFreehand from './useRenderFreehand';
import useRenderSelectMode from './useRenderSelectMode';
import useRenderText from './useRenderText';

const useSetCanvasEventsFunctions = () => {
  const { handleRenderingCircle } = useRenderCircle();
  const { handleRenderingEllipse } = useRenderEllipse();
  const { handleRenderingTriangle } = useRenderTriangle();
  const { handleRenderingRectangle } = useRenderRectangle();
  const { handleRenderingLine } = useRenderLine();
  const { clearCanvas } = useClearCanvas();
  const { handleRenderingFreehand } = useRenderFreehand();
  const { handleRenderSelectMode } = useRenderSelectMode();
  const {handleRenderText} = useRenderText();

  const handleSetCanvasEvents = (canvas: fabric.Canvas,
    currentMode: string,
    currentColor: string,
    currentBrushSize: number,
    fillShape: 0 | 1) => {
    if (!canvas || !currentMode) return;

    const rgbValue = hexToRGB(currentColor);
    resetEventHandlers(canvas);

    if (currentMode === 'clear') {
      canvas.isDrawingMode = false;
      clearCanvas(canvas);
    } else if (currentMode === 'rectangle') {
      handleRenderingRectangle(
        canvas,
        currentColor,
        currentBrushSize,
        rgbValue,
        fillShape
      );
    } else if (currentMode === 'circle') {
      handleRenderingCircle(canvas, currentColor, currentBrushSize, rgbValue, fillShape);
    } else if (currentMode === 'freehand') {
      handleRenderingFreehand(canvas, currentColor, currentBrushSize);
    } else if (currentMode === 'triangle') {
      handleRenderingTriangle(canvas, currentColor, currentBrushSize, rgbValue, fillShape);
    } else if (currentMode === 'ellipse') {
      handleRenderingEllipse(canvas, currentColor, currentBrushSize, rgbValue, fillShape);
    } else if (currentMode === 'select') {
      handleRenderSelectMode(canvas);
    } else if (currentMode === 'line') {
      handleRenderingLine(canvas, currentColor, currentBrushSize, rgbValue);
    } else if (currentMode === 'text') {
      handleRenderText(canvas);
      console.log('text is clicked');
    }
  };
  return { handleSetCanvasEvents };
};

export default useSetCanvasEventsFunctions;


