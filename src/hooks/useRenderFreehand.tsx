import { fabric } from 'fabric';
import { useDispatch } from 'react-redux';
import { addAnnotations } from '../redux-state/features/drawing/drawingSlice';

const useRenderFreehand = () => {
  const dispatch = useDispatch();
  const handleRenderingFreehand = (
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
    canvas.on('mouse:move', function(){
      canvas.freeDrawingBrush.color = currentColor;
      canvas.freeDrawingBrush.width = currentBrushSize;
      canvas.isDrawingMode = true;
      canvas.renderAll();
    });
    canvas.on('mouse:up', () => {
      if (canvas.isDrawingMode) {
        canvas.isDrawingMode = false;
        const canvasJson = canvas.toJSON();
        const size = canvasJson.objects.length;
        dispatch(addAnnotations(canvasJson.objects[size-1]));
      }
    });

  };
  return { handleRenderingFreehand };
};

export default useRenderFreehand;
