import { fabric } from 'fabric';
import { useDispatch } from 'react-redux';
import { addAnnotations } from '../redux-state/features/drawing/drawingSlice';

const useRenderCircle = () => {
  const dispatch = useDispatch();
  const handleRenderingEllipse = (
    canvas: fabric.Canvas,
    currentColor: string,
    currentBrushSize: number,
    rgbValue: { red: number; green: number; blue: number },
    fillShape: 0 | 1
  ) => {
    let ellipse: fabric.Ellipse, isDown: boolean, origX: number, origY: number;

    canvas.on('mouse:down', function (o) {
      canvas.isDrawingMode = false;
      isDown = true;
      const pointer = canvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      ellipse = new fabric.Ellipse({
        left: origX,
        top: origY,
        originX: 'left',
        originY: 'top',
        rx: pointer.x - origX,
        ry: pointer.y - origY,
        angle: 0,
        stroke: currentColor,
        strokeWidth: currentBrushSize,
        fill: `rgba(${rgbValue.red},${rgbValue.green},${rgbValue.blue},${fillShape})`,
      });
      canvas.add(ellipse);
    });

    canvas.on('mouse:move', function (o) {
      canvas.isDrawingMode = false;
      if (!isDown) return;
      const pointer = canvas.getPointer(o.e);

      if (origX > pointer.x) {
        ellipse.set({ left: Math.abs(pointer.x) });
      }
      if (origY > pointer.y) {
        ellipse.set({ top: Math.abs(pointer.y) });
      }

      ellipse.set({ rx: Math.abs(origX - pointer.x) });
      ellipse.set({ ry: Math.abs(origY - pointer.y) });

      canvas.renderAll();
    });

    canvas.on('mouse:up', function () {
      canvas.isDrawingMode = false;
      isDown = false;
      if (ellipse) {
        dispatch(addAnnotations(ellipse.toJSON([])));
      }
    });
  };

  return { handleRenderingEllipse };
};

export default useRenderCircle;
