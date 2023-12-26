import { fabric } from 'fabric';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux-state/store';
import { changeBrightness, changeContrast } from '../redux-state/features/drawing/drawingSlice';

type ImagePropertyValues = {
  'brightnessValue': number,
  'contrastValue': number,
}

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

const useInitializeCanvas = () => {
  const fileName = useSelector((state: RootState) => state.loadImage.fileName);
  const dispatch = useDispatch();

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
        img.height!*
        Math.min(heightCanvas! / img.width!, widthCanvas! / img.height!);
      const finalWidth =
        img.width! *
        Math.min(heightCanvas! / img.width!, widthCanvas! / img.height!);

      if (img.height! > img.width!) {
        img.scaleToHeight(finalHeight);
      } else {
        img.scaleToWidth(finalWidth);
      }

      if(localStorage.getItem(fileName+'ImageProperties')){
        const imagePropertyValues: ImagePropertyValues = JSON.parse(localStorage.getItem(fileName+'ImageProperties')!);
        const brightnessFilter = new fabric.Image.filters.Brightness({
          brightness: imagePropertyValues.brightnessValue,
        });

        const contrastFilter = new fabric.Image.filters.Contrast({
          contrast: imagePropertyValues.contrastValue,
        });
  
        img.filters=[];
  
        img.filters.push(brightnessFilter);
        img.filters.push(contrastFilter);
        img.applyFilters();
        dispatch(changeBrightness(imagePropertyValues.brightnessValue));
        dispatch(changeContrast(imagePropertyValues.contrastValue));
      }else{
        dispatch(changeBrightness(0));
        dispatch(changeContrast(0));
      }

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        top: center?.top,
        left: center?.left,
        originX: 'center',
        originY: 'center',
      });
      canvas.renderAll();
    });

    if (fileName && localStorage.getItem(fileName)) {
      const annaotationArray = JSON.parse(localStorage.getItem(fileName)!);
      if (annaotationArray) {
        for (let i = 0; i < annaotationArray.length; i++) {
          if (annaotationArray[i].type === 'circle') {
            const circle = new fabric.Circle(annaotationArray[i]);
            canvas.add(circle);
          } else if (annaotationArray[i].type === 'ellipse') {
            const ellipse = new fabric.Ellipse(annaotationArray[i]);
            canvas.add(ellipse);
          } else if (annaotationArray[i].type === 'triangle') {
            const triangle = new fabric.Triangle(annaotationArray[i]);
            canvas.add(triangle);
          } else if (annaotationArray[i].type === 'rect') {
            const rectangle = new fabric.Rect(annaotationArray[i]);
            canvas.add(rectangle);
          } else if (annaotationArray[i].type === 'line') {
            const line = new fabric.Line();
            line.angle = annaotationArray[i].angle;
            line.backgroundColor = annaotationArray[i].backgroundColor;
            line.fill = annaotationArray[i].fill;
            line.fillRule = annaotationArray[i].fillRule;
            line.flipX = annaotationArray[i].flipX;
            line.flipY = annaotationArray[i].flipY;
            line.globalCompositeOperation = annaotationArray[i].globalCompositeOperation;
            line.height = annaotationArray[i].height;
            line.left = annaotationArray[i].left;
            line.opacity = annaotationArray[i].opacity;
            line.originX = annaotationArray[i].originX;
            line.originY = annaotationArray[i].originY;
            line.x1 = annaotationArray[i].x1;
            line.x2 = annaotationArray[i].x2;
            line.y1 = annaotationArray[i].y1;
            line.y2 = annaotationArray[i].y2;
            line.width = annaotationArray[i].width;
            line.top = annaotationArray[i].top;
            line.visible = true;
            line.stroke = annaotationArray[i].stroke;
            canvas.add(line);
          }else if(annaotationArray[i].type ==='path'){
            fabric.Path.fromObject(annaotationArray[i], function(path:fabric.Path){
              canvas.add(path);
              canvas.renderAll();
            });
          }
        }
      }
    }
    return canvas;
  };

  return { initializeCanvas };
};



export default useInitializeCanvas;