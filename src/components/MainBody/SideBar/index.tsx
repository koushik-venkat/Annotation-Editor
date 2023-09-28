import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeBrushSize,
  toggleFillShape,
} from '../../../redux-state/features/drawing/drawingSlice';
import Button from './Button';
import { RootState } from '../../../redux-state/store';
import ColorPicker from './ColorPicker';
import { clsx } from 'clsx';

const index = () => {
  const dispatch = useDispatch();
  const currentMode = useSelector((state: RootState) => state.drawing.mode);
  const [brushSize, setBrushSize] = useState<number>(1);
  const currentThemeDark = useSelector((state: RootState) => state.darkMode.darkMode);

  const handleToggle = () => {
    dispatch(toggleFillShape());
  };

  useEffect(() => {
    dispatch(changeBrushSize(brushSize));
  }, [brushSize]);

  return (
    <div
      className={clsx(
        'flex flex-col',
        currentThemeDark ? 'bg-[#000000]' : 'bg-[#F3F2F0]'
      )}
    >
      <div
        className={clsx(
          'm-3 p-5  border-slate-950  shadow-sm z-50   flex flex-col  flex-1 rounded-lg w-max',
          currentThemeDark
            ? 'bg-[#1B1F23] shadow-slate-600'
            : 'bg-white shadow-[#d9d6d6]'
        )}
      >
        <h4
          className={clsx(
            ' font-bold border-b p-2 text-center',
            currentThemeDark ? 'text-white' : 'text-gray-800'
          )}
        >
          Editing Tools
        </h4>
        <div>
          <div className="flex">
            <Button onClickString={'freehand'} buttonTitle={'Freehand'} />
            <Button onClickString={'line'} buttonTitle={'Line'} />
          </div>

          <div className="flex ">
            <Button onClickString={'circle'} buttonTitle={'Circle'} />
            <Button onClickString={'rectangle'} buttonTitle={'Rectangle'} />
          </div>
          <div className="flex ">
            <Button onClickString={'triangle'} buttonTitle={'Traingle'} />
            <Button onClickString={'ellipse'} buttonTitle={'Ellipse'} />
          </div>
          <div className="flex">
            <Button onClickString={'select'} buttonTitle={'Select'} />
            <Button onClickString={'clear'} buttonTitle={'Clear'} />
          </div>

          <div></div>
        </div>

        <div
          className={clsx(
            currentMode !== null
              ? currentThemeDark
                ? 'flex  p-5 rounded-md mt-3 justify-around shadow-md flex-col gap-3 border'
                : 'flex  p-5 rounded-md mt-3 justify-around shadow-md flex-col gap-3 border border-black'
              : currentThemeDark
                ? 'flex  p-5 rounded-md mt-3 justify-around shadow-md flex-col  gap-3 border opacity-25'
                : 'flex  p-5 rounded-md mt-3 justify-around shadow-md flex-col  gap-3 border text-gray-300'
          )}
        >
          <p
            className={clsx(
              'font-semibold text-center border-b  pb-2 ',
              currentThemeDark ? 'text-white  border-white' : ' border-slate-300'
            )}
          >
            Brush Properties
          </p>
          <div className='flex items-center'>
            <label
              htmlFor='pickColor'
              className={clsx(
                'font-medium text-[14px]  mr-1.5',
                currentThemeDark ?
                  currentMode ?
                    'text-white' :
                    'text-white'
                  : currentMode ?
                    'text-black' :
                    'text-gray-300'
              )}
            >
              Brush Color:
            </label>
            <div id="pickColor" className="mt-1">
              <ColorPicker></ColorPicker>
            </div>
          </div>
          <div className="flex items-center">
            <label
              htmlFor="brushSize "
              className={clsx(
                'font-medium text-[14px]  mr-3',
                currentThemeDark ?
                  currentMode ?
                    'text-white' :
                    'text-white'
                  : currentMode ?
                    'text-black' :
                    'text-gray-300'
              )}
            >
              Brush Size:
            </label>
            <input
              disabled={currentMode === null}
              type='range'
              className={clsx(
                ' w-24 ml-1 mt-1',
                currentThemeDark ? 'accent-slate-200' : 'accent-gray-800'
              )}
              min={1}
              max={50}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
            />
          </div>
          <div className="flex mt-3">
            <p
              className={clsx(
                'font-medium text-[14px] mr-4',
                currentThemeDark ?
                  currentMode ?
                    'text-white' :
                    'text-white'
                  : currentMode ?
                    'text-black' :
                    'text-gray-300'

              )}
            >
              Fill Shape:
            </p>
            <label
              className={clsx(
                'relative inline-flex items-center mb-5',
                currentMode === null ? 'cursor-not-allowed' : 'cursor-pointer'
              )}
            >
              <input
                disabled={currentMode === null}
                type="checkbox"
                value=""
                className="sr-only peer accent-black disabled:cursor-not-allowed"
                onClick={handleToggle}
              />
              <div
                className={clsx(
                  'w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-400 dark:peer-focus:ring-slate-600 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#E2E8F0]',
                  currentMode !== null
                    ? currentThemeDark
                      ? 'peer-checked:bg-white  dark:bg-gray-700 after:dark:bg-gray-700'
                      : 'peer-checked:bg-gray-700  dark:bg-slate-300 after:dark:bg-gray-700'
                    : currentThemeDark
                      ? ''
                      : 'dark:bg-gray-400'
                )}
              ></div>
            </label>
          </div>
        </div>
        <div className="justify-center ">
          <Button onClickString={'save'} buttonTitle={'Save'} />
        </div>
      </div>
    </div>
  );
};

export default index;
