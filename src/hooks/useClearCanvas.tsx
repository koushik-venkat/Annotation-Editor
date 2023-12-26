import { useDispatch, useSelector } from 'react-redux';
import { emptyAnnotations } from '../redux-state/features/drawing/drawingSlice';
import { RootState } from '../redux-state/store';

const useClearCanvas = () => {
  const dispatch = useDispatch();
  const fileName = useSelector((state: RootState) => state.loadImage.fileName);
  const clearCanvas = (canvas: fabric.Canvas) => {
    canvas.getObjects().forEach((item) => {
      if (item !== canvas.backgroundImage) {
        canvas.remove(item);
        dispatch(emptyAnnotations());
        localStorage.removeItem(fileName!);
      }
    });
  };
  return { clearCanvas };
};

export default useClearCanvas;
