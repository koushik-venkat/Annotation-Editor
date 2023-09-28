import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux-state/store';
import { useCanvasContext } from '../context/CanvasProvider';
import { mode } from '../redux-state/features/drawing/drawingSlice';
import initializeCanvas from '../utils/initializeCanvas';

export const useUpdateCanvasSize = (EditSectionComponentRef: React.MutableRefObject<HTMLDivElement | null>) => {
  const [widthCanvas, setWidthCanvas] = useState<number>(800);
  const [heightCanvas, setHeightCanvas] = useState<number>(450);
  const { setCanvas } = useCanvasContext();
  const urlImage = useSelector((state: RootState) => state.loadImage.imageURL);
  const currentThemeDark = useSelector((state: RootState) => state.darkMode.darkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateComponentSize = () => {
      const element = EditSectionComponentRef.current;
      if (element) {
        const { width, height } = element.getBoundingClientRect();
        setWidthCanvas(width);
        setHeightCanvas(height);
      }
    };
    if (urlImage) {
      setCanvas(initializeCanvas(urlImage, widthCanvas, heightCanvas, currentThemeDark));
      updateComponentSize();
      window.addEventListener('resize', updateComponentSize);
    } else {
      dispatch(mode(null));
      setCanvas(null);
      EditSectionComponentRef.current = null;
    }
    return () => {
      window.removeEventListener('resize', updateComponentSize);
    };
  }, [urlImage]);
};