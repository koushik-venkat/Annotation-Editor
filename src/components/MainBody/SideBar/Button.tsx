import { useSelector } from 'react-redux';
import ButtonIcon from './ButtonIcon';
import { RootState } from '../../../redux-state/store';

import clsx from 'clsx';
import useSideBarButtonClick from '../../../hooks/useSideBarButtonClick';

type ButtonPropsType = {
  onClickString: string;
  buttonTitle: string;
};

type HandleSideButtonClick = (payload: string) => void;

const Button = ({ onClickString, buttonTitle }: ButtonPropsType) => {
  const { handleSideBarButtonClick } = useSideBarButtonClick();
  const urlImage = useSelector((state: RootState) => state.loadImage.imageURL);
  const currentThemeDark = useSelector((state: RootState) => state.darkMode.darkMode);

  const handleClick: HandleSideButtonClick = () => {
    handleSideBarButtonClick(onClickString);
  };

  return (
    <div>
      <button
        disabled={urlImage === null}
        type="button"
        
        className={clsx(
          'focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-3.5  mb-2   w-17 flex justify-center items-center h-10 disabled:opacity-25  disabled:cursor-not-allowed',
          (onClickString === 'clear')? 'w-80 mx-3 ' : '',
          (onClickString !== 'download' && onClickString !== 'saveCanvas' )
            ? 'w-36 mr-2 m-4'
            : 'w-40 rounded-md  mt-5 ',
          currentThemeDark
            ? 'text-[#FFFFFF] border   hover:bg-gray-700 dark:focus:ring-gray-600 dark:border-white'
            : 'text-black border border-black  hover:bg-gray-200'
        )}
        onClick={() => handleClick(onClickString)}
      >
        <ButtonIcon title={onClickString} />
        {buttonTitle}
      </button>
    </div>
  );
};

export default Button;