import { useDispatch } from 'react-redux';
import { mode, saveImage } from '../redux-state/features/drawing/drawingSlice';

const useSideBarButtonClick = () => {
  const dispatch = useDispatch();
  const handleSideBarButtonClick = (buttonPressed: string) => {
    if (buttonPressed === 'save') {
      dispatch(saveImage());
    } else {
      dispatch(mode(buttonPressed));
    }
  };
  return { handleSideBarButtonClick };

};

export default useSideBarButtonClick;
