import { fabric } from 'fabric';
const renderCircle = (
  canvas: fabric.Canvas,
  currentColor: string,
  currentBrushSize: number,
  rgbValue: { red: number; green: number; blue: number },
  fillShape: 0 | 1
) => {
  let circle: fabric.Circle, isDown: boolean, origX: number, origY: number;
  canvas.on('mouse:down', function (o) {
    canvas.isDrawingMode = false;
    isDown = true;
    const pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;

    circle = new fabric.Circle({
      left: origX,
      top: origY,
      originX: 'left',
      originY: 'top',
      radius: pointer.x - origX,
      angle: 0,
      stroke: currentColor,
      strokeWidth: currentBrushSize,
      fill: `rgba(${rgbValue.red},${rgbValue.green},${rgbValue.blue},${fillShape})`,
    });
    canvas.add(circle);
  });

  canvas.on('mouse:move', function (o) {
    canvas.isDrawingMode = false;
    if (!isDown) return;
    const pointer = canvas.getPointer(o.e);

    if (origX > pointer.x) {
      circle.set({ left: Math.abs(pointer.x) });
    }
    if (origY > pointer.y) {
      circle.set({ top: Math.abs(pointer.y) });
    }

    circle.set({
      radius: Math.abs(Math.max(origX - pointer.x, origY - pointer.y)),
    });
    canvas.renderAll();
  });
  canvas.on('mouse:up', function () {
    canvas.isDrawingMode = false;
    isDown = false;
    canvas.renderAll();
  });
};

export default renderCircle;
