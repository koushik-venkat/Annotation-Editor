import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux-state/store';
import { useCanvasContext } from '../context/CanvasProvider';
import { mode } from '../redux-state/features/drawing/drawingSlice';
import useInitializeCanvas from './useInitializeCanvas';

export const useUpdateCanvasSize = (EditSectionComponentRef: React.MutableRefObject<HTMLDivElement | null>) => {
  const [widthCanvas] = useState<number>(1200);
  const [heightCanvas] = useState<number>(700);
  const { setCanvas } = useCanvasContext();
  const urlImage = useSelector((state: RootState) => state.loadImage.imageURL);
  const currentThemeDark = useSelector((state: RootState) => state.darkMode.darkMode);
  const dispatch = useDispatch();
  const {initializeCanvas} = useInitializeCanvas();

  useEffect(() => {
    if (urlImage) {
      setCanvas(initializeCanvas(urlImage, widthCanvas, heightCanvas, currentThemeDark));
    } else {
      dispatch(mode(null));
      setCanvas(null);
      EditSectionComponentRef.current = null;
    }
  }, [urlImage,]);
};