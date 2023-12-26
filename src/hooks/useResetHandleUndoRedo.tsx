import { useEffect } from 'react';
import { emptyHistoryStack } from '../redux-state/features/drawing/drawingSlice';
import { useDispatch } from 'react-redux';
import useHandleUndoRedo from './useHandleUndoRedo';
import { useCanvasContext } from '../context/CanvasProvider';

const useResetHandleUndoRedo = () => {
  const dispatch = useDispatch();
  const { isRedoing, setIsRedoing } = useHandleUndoRedo();
  const { canvas } = useCanvasContext();
  
  useEffect(() => {
    if (canvas === null)
      return;
    if (isRedoing) {
      dispatch(emptyHistoryStack());
    }
    setIsRedoing(false);

  }, []);
};

export default useResetHandleUndoRedo;
