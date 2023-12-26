import { useEffect } from 'react';
import useSetCanvasEventsFunctions from './useSetCanvasEventsFunctions';

export const useSetCanvasEvents = (dependecies: { currentMode: string | null, currentBrushSize: number, currentColor: string, fillShape: 0 | 1, }, canvas: fabric.Canvas | null) => {
  const { handleSetCanvasEvents } = useSetCanvasEventsFunctions();
  useEffect(() => {
    if (canvas && dependecies.currentMode)
      handleSetCanvasEvents(
        canvas,
        dependecies.currentMode,
        dependecies.currentColor,
        dependecies.currentBrushSize,
        dependecies.fillShape
      );
  }, [dependecies.currentMode, dependecies.currentBrushSize, dependecies.currentColor, dependecies.fillShape]);
};
