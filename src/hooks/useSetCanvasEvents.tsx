import { useEffect } from 'react';
import setCanvasEvents from '../utils/setCanvasEvents';

export const useSetCanvasEvents = (dependecies: { currentMode: string | null, currentBrushSize: number, currentColor: string, fillShape: 0 | 1, }, canvas: fabric.Canvas | null) => {
  useEffect(() => {
    if (canvas && dependecies.currentMode)
      setCanvasEvents(
        canvas,
        dependecies.currentMode,
        dependecies.currentColor,
        dependecies.currentBrushSize,
        dependecies.fillShape
      );
  }, [dependecies.currentMode, dependecies.currentBrushSize, dependecies.currentColor, dependecies.fillShape]);
};
