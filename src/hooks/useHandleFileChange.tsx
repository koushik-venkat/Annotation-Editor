import { useDispatch } from 'react-redux';
import { loadImageURL } from '../redux-state/features/loadImage/loadImageSlice';

const useHandleFileChange = () => {
  const dispatch = useDispatch();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(loadImageURL(imageUrl));
    }
  };

  return { handleFileChange };
};

export default useHandleFileChange;