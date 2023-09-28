import { useState } from 'react';

const useHandleUndoRedo = () => {

  // eslint-disable-next-line prefer-const
  let historyStack: fabric.Object[] = [];
  const [isRedoing, setIsRedoing] = useState<boolean>(false);

  const handleUndoRedo = (canvas: fabric.Canvas | null, condition: 'undo' | 'redo') => {
    if (canvas === null) return;
    if (condition === 'undo') {
      if (canvas._objects.length > 0) {
        const popObject = canvas._objects[canvas._objects.length - 1];
        canvas._objects.pop();
        historyStack.push(popObject);
        canvas.renderAll();
      }
    } else if (condition === 'redo') {
      if (historyStack.length > 0) {
        setIsRedoing(true);
        const pushObject = historyStack[historyStack.length - 1];
        historyStack.pop();
        canvas.add(pushObject);
      }
    }
  };
  return { handleUndoRedo, historyStack, isRedoing, setIsRedoing };
};

export default useHandleUndoRedo;