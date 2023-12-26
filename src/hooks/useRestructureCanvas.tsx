import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeBrightness, changeContrast } from '../redux-state/features/drawing/drawingSlice';
import { RootState } from '../redux-state/store';
import { useCanvasContext } from '../context/CanvasProvider';
import {fabric} from 'fabric';

const useRestructureCanvas = (
) => {
  const dispatch = useDispatch();
  const brightness = useSelector((state:RootState)=> state.drawing.brightness);
  const contrast = useSelector((state:RootState)=> state.drawing.contrast);
  const imgURL = useSelector((state:RootState)=> state.loadImage.imageURL);
  const {canvas} = useCanvasContext();

  useEffect(() => {
    const heightCanvas = 450;
    const widthCanvas = 800;
    dispatch(changeBrightness(brightness));
    dispatch(changeContrast(contrast));
    if (canvas) {
      const center = canvas?.getCenter();
      fabric.Image.fromURL(imgURL!, (img) => {
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
        const brightnessFilter = new fabric.Image.filters.Brightness({
          brightness: brightness,
        });

        const contrastFilter = new fabric.Image.filters.Contrast({
          contrast: contrast,
        });
        img.filters = [];
        img.filters.push(brightnessFilter);
        img.filters.push(contrastFilter);
        img.applyFilters();

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          top: center?.top,
          left: center?.left,
          originX: 'center',
          originY: 'center',
        });
        canvas.renderAll();
      });
    }
  }, [brightness, contrast]);
};

export default useRestructureCanvas;
