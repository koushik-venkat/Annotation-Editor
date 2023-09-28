import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadImageURL } from '../../redux-state/features/loadImage/loadImageSlice';
import { RootState } from '../../redux-state/store';
import clsx from 'clsx';
import useHandleFileChange from '../../hooks/useHandleFileChange';

type HandleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => void;

const Footer = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlImage = useSelector((state: RootState) => state.loadImage.imageURL);
  const currentThemeDark = useSelector((state: RootState) => state.darkMode.darkMode);
  const dispatch = useDispatch();
  const { handleFileChange } = useHandleFileChange();

  const handleFileChangeFooter: HandleFileChange = (event) => {
    handleFileChange(event);
  };

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      dispatch(loadImageURL(null));
    }
  };

  return (
    <div
      className={clsx(
        'flex flex-col shadow-[#000000] shadow-lg',
        currentThemeDark
          ? 'bg-[#1B1F23] border-black shadow-slate-600'
          : 'shadow-[#000000] bg-white border-black'
      )}
    >
      <label
        className={clsx(
          'p-t-5 block mb-2 text-sm font-medium cursor-pointer ml-5 mt-3',
          currentThemeDark ? 'text-white' : 'text-gray-800'
        )}
        htmlFor='fileInput'
      >
        Upload file
      </label>
      <div className='flex'>
        <input
          disabled={urlImage !== null}
          type='file'
          id='fileInput'
          onChange={(event) => handleFileChangeFooter(event)}
          ref={fileInputRef}
          className={clsx(
            ' block text-md  border file:hover:cursor-pointer  rounded-lg cursor-pointer   focus:outline-none mb-4 ml-5 w-80 p-0  file:py-1.5  file:focus:outline-none file:focus:ring-4  disabled:opacity-60 disabled:hover:cursor-not-allowed',
            currentThemeDark
              ? 'text-white border-slate-500 bg-[#252628] file:bg-gray-50 file:text-slate-800 file:hover:bg-gray-300 file:focus:ring-gray-700'
              : 'text-gray-900 border-gray-300 bg-gray-50 file:bg-gray-900 file:text-white file:hover:bg-gray-800 file:focus:ring-gray-300'
          )}
        />

        <div className="flex">
          <button
            disabled={urlImage === null}
            className={clsx(
              'inline-block focus:outline-none text-red-600 border border-red-600  focus:ring-2 focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-4  ml-5 w-32 hover:border-red-500 hover:bg-red-200 disabled:hover:cursor-not-allowed disabled:hover:bg-white',

              currentThemeDark ? 'disabled:opacity-40 disabled:hover:bg-[#1B1F23] hover:bg-red-900 text-red-500' : 'disabled:opacity-50'
            )}
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
