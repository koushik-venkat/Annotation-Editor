import { fabric } from 'fabric';

const renderRectangle = (
  canvas: fabric.Canvas,
  currentColor: string,
  currentBrushSize: number,
  rgbValue: { red: number; green: number; blue: number },
  fillShape: 0 | 1
) => {
  let rect: fabric.Rect, isDown: boolean, origX: number, origY: number;

  canvas.on('mouse:down', function (o) {
    canvas.isDrawingMode = false;
    isDown = true;
    const pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    rect = new fabric.Rect({
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
    canvas.add(rect);
  });

  canvas.on('mouse:move', function (o) {
    canvas.isDrawingMode = false;
    if (!isDown) return;
    const pointer = canvas.getPointer(o.e);

    if (origX > pointer.x) {
      rect.set({ left: Math.abs(pointer.x) });
    }
    if (origY > pointer.y) {
      rect.set({ top: Math.abs(pointer.y) });
    }

    rect.set({ width: Math.abs(origX - pointer.x) });
    rect.set({ height: Math.abs(origY - pointer.y) });

    canvas.renderAll();
  });

  canvas.on('mouse:up', function () {
    canvas.isDrawingMode = false;
    isDown = false;
    canvas.renderAll();
  });
};

export default renderRectangle;
