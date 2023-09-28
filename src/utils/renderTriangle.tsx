import { fabric } from 'fabric';

const renderTriangle = (
  canvas: fabric.Canvas,
  currentColor: string,
  currentBrushSize: number,
  rgbValue: { red: number; green: number; blue: number },
  fillShape: 0 | 1
) => {
  let triangle: fabric.Triangle, isDown: boolean, origX: number, origY: number;

  canvas.on('mouse:down', function (o) {
    canvas.isDrawingMode = false;
    isDown = true;
    const pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    triangle = new fabric.Triangle({
      left: origX,
      top: origY,
      originX: 'left',
      originY: 'top',
      width: pointer.x - origX,
      height: pointer.y - origY,
      angle: 0,
      stroke: currentColor,
      strokeWidth: currentBrushSize,
      fill: `rgba(${rgbValue.red},${rgbValue.green},${rgbValue.blue},${fillShape})`,
    });
    canvas.add(triangle);
  });

  canvas.on('mouse:move', function (o) {
    canvas.isDrawingMode = false;
    if (!isDown) return;
    const pointer = canvas.getPointer(o.e);

    if (origX > pointer.x) {
      triangle.set({ left: Math.abs(pointer.x) });
    }
    if (origY > pointer.y) {
      triangle.set({ top: Math.abs(pointer.y) });
    }

    triangle.set({ width: Math.abs(origX - pointer.x) });
    triangle.set({ height: Math.abs(origY - pointer.y) });

    canvas.renderAll();
  });

  canvas.on('mouse:up', function () {
    canvas.isDrawingMode = false;
    isDown = false;
    canvas.renderAll();
  });
};

export default renderTriangle;
