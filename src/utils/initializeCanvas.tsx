import { fabric } from 'fabric';

const createNewCanvas = (
  heightCanvas: number,
  widthCanvas: number,
  bgColor: string
) => {
  return new fabric.Canvas('canvas', {
    height: heightCanvas,
    width: widthCanvas,
    backgroundColor: bgColor,
    selection: false,
    defaultCursor: 'crosshair',
  });
};

const initializeCanvas = (
  urlImage: string,
  widthCanvas: number,
  heightCanvas: number,
  currentThemeDark: boolean
) => {
  const canvas = currentThemeDark
    ? createNewCanvas(heightCanvas, widthCanvas, 'white')
    : createNewCanvas(heightCanvas, widthCanvas, 'white');
  const center = canvas?.getCenter();
  fabric.Image.fromURL(urlImage, (img) => {
    const finalHeight =
      img.height! *
      Math.min(heightCanvas! / img.width!, widthCanvas! / img.height!);
    const finalWidth =
      img.width! *
      Math.min(heightCanvas! / img.width!, widthCanvas! / img.height!);

    if (img.height! > img.width!) {
      img.scaleToHeight(finalHeight);
    } else {
      img.scaleToWidth(finalWidth);
    }

    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
      top: center?.top,
      left: center?.left,
      originX: 'center',
      originY: 'center',
    });
    canvas.renderAll();
  });

  return canvas;
};

export default initializeCanvas;
