import { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { RootState } from '../redux-state/store';

const useAnnotationsUpdate = (canvas: fabric.Canvas | null) => {

  const annotations = useSelector((state: RootState) => state.drawing.annotations);
  
  useEffect(() => {
    if (canvas === null)
      return;
    canvas.add(...annotations);
  }, [annotations]);
};

export default useAnnotationsUpdate;
