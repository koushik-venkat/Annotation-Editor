import { useEffect } from 'react';

const useResetHandleUndoRedo = (canvas: fabric.Canvas | null, isRedoing: boolean, historyStack: fabric.Object[], setIsRedoing: React.Dispatch<React.SetStateAction<boolean>>) => {
  useEffect(() => {
    if (canvas === null)
      return;
    canvas.on('object:added', () => {
      if (isRedoing) {
        historyStack = [];
      }
      setIsRedoing(false);
    });
  }, [canvas?._objects]);
};

export default useResetHandleUndoRedo;