import { useDispatch } from 'react-redux';
import { emptyAnnotations, mode, saveImage, saveToggle } from '../redux-state/features/drawing/drawingSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../redux-state/store';
import { fabric } from 'fabric';

const useSideBarButtonClick = () => {
  const dispatch = useDispatch();
  const annotationsArray = useSelector((state: RootState) => state.drawing.annotations);
  const fileName = useSelector((state: RootState) => state.loadImage.fileName);
  const brightnessValue = useSelector((state: RootState) => state.drawing.brightness);
  const contrastValue = useSelector((state: RootState) => state.drawing.contrast);

  const handleSideBarButtonClick = (buttonPressed: string) => {
    if (buttonPressed === 'download') {
      dispatch(saveImage());
    } else if (buttonPressed === 'saveCanvas' && fileName) {
      let tempArray: fabric.Object[] = [];
      if (localStorage.getItem(fileName) && localStorage.getItem(fileName) != null){
        tempArray = tempArray.concat(JSON.parse(localStorage.getItem(fileName)!));
      }
      if (annotationsArray){
        tempArray = tempArray.concat(annotationsArray);
      }
      if (tempArray) {
        localStorage.setItem(fileName, JSON.stringify(tempArray));
      }
      localStorage.setItem(fileName + 'ImageProperties', JSON.stringify({ 'brightnessValue': brightnessValue, 'contrastValue': contrastValue }));
      dispatch(emptyAnnotations());
      dispatch(saveToggle());
    }
    else {
      dispatch(mode(buttonPressed));
    }
  };
  return { handleSideBarButtonClick };
};

export default useSideBarButtonClick;
