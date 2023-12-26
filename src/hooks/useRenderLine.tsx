import { fabric } from 'fabric';
import { useDispatch } from 'react-redux';
import { addAnnotations } from '../redux-state/features/drawing/drawingSlice';

const useRenderLine = () => {
  const dispatch = useDispatch();
  const handleRenderingLine = (
    canvas: fabric.Canvas,
    currentColor: string,
    currentBrushSize: number,
    rgbValue: { red: number; green: number; blue: number }
  ) => {
    let line: fabric.Line, isDown: boolean;

    canvas.on('mouse:down', function (o) {
      canvas.isDrawingMode = false;
      isDown = true;
      const pointer = canvas.getPointer(o.e);

      const points: number[] = [pointer.x, pointer.y, pointer.x, pointer.y];
      line = new fabric.Line(points, {
        originX: 'center',
        originY: 'center',
        stroke: currentColor,
        strokeWidth: currentBrushSize,
        fill: `rgba(${rgbValue.red},${rgbValue.green},${rgbValue.blue})`,
      });
      canvas.add(line);
    });

    canvas.on('mouse:move', function (o) {
      canvas.isDrawingMode = false;
      if (!isDown) return;
      const pointer = canvas.getPointer(o.e);
      line.set({ x2: pointer.x, y2: pointer.y });
      canvas.renderAll();
    });

    canvas.on('mouse:up', function () {
      canvas.isDrawingMode = false;
      isDown = false;
      if (line) {
        dispatch(addAnnotations(line.toJSON([])));
      }
    });
  };
  return { handleRenderingLine };
};

export default useRenderLine;
