import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux-state/store';
import { useCanvasContext } from '../../../context/CanvasProvider';
import saveCanvasAsImage from '../../../utils/saveCanvasAsImage';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { toggleDarkMode } from '../../../redux-state/features/darkMode/darkModeSlice';
import clsx from 'clsx';
import { useSetCanvasEvents } from '../../../hooks/useSetCanvasEvents';
import { useUpdateCanvasSize } from '../../../hooks/useUpdateCanvasSize';
import useHandleUndoRedo from '../../../hooks/useHandleUndoRedo';
import useResetHandleUndoRedo from '../../../hooks/useResetHandleUndoRedo';

const index = () => {
  const { canvas } = useCanvasContext();
  const dispatch = useDispatch();
  const currentMode = useSelector((state: RootState) => state.drawing.mode);
  const urlImage = useSelector((state: RootState) => state.loadImage.imageURL);
  const EditSectionComponentRef = useRef<HTMLDivElement | null>(null);
  const currentColor = useSelector((state: RootState) => state.drawing.color);
  const currentThemeDark = useSelector((state: RootState) => state.darkMode.darkMode);
  const fillShape: 0 | 1 = useSelector((state: RootState) => state.drawing.fillShape) ? 1 : 0;
  const currentBrushSize = useSelector((state: RootState) => state.drawing.brushSize);
  const saveToggle = useSelector((state: RootState) => state.drawing.save);
  const { handleUndoRedo } = useHandleUndoRedo();

  const saveToggleState = useSelector((state: RootState) => state.drawing.saveToggleState);
  useUpdateCanvasSize(EditSectionComponentRef);

  useEffect(() => {
    saveCanvasAsImage(canvas!);
  }, [saveToggle]);

  useSetCanvasEvents({ currentMode, currentBrushSize, currentColor, fillShape }, canvas);


  useResetHandleUndoRedo();

  const toggleDarkModeButton = () => {
    dispatch(toggleDarkMode());
  };

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(false);
    }, 1500);
    setShowPopup(true);
  }, [saveToggleState]);

  let xPointer = 0;
  let yPointer = 0;
  if (canvas)
    canvas.on('mouse:down', (o) => {
      const pointer = canvas.getPointer(o.e);
      xPointer = pointer.x;
      yPointer = pointer.y;
    });

  // const [mouseDown, setMouseDown] = useState(false);

  return (
    <>

      <div
        className={clsx(
          'flex flex-col flex-1 pt-2',
          currentThemeDark ? 'bg-[rgb(0,0,0)]' : 'bg-[#F3F2F0]'
        )}
      >



        <div
          className={clsx(
            'relative rounded-lg m-1 ml-3 w-7/10  shadow-sm  flex flex-col flex-1 mb-3',
            currentThemeDark
              ? 'bg-[#1B1F23] shadow-slate-600'
              : 'bg-white shadow-[#d9d6d6]'
          )}
        >

          <div className='flex'>
            <h1
              className={clsx(
                'text-center  font-bold border-b p-2 pt-4  m-3 ml-5 mr-5 flex flex-1 justify-center',
                currentThemeDark ? 'text-white' : 'text-gray-800'
              )}
            >
              Drawing Canvas
            </h1>
            {currentThemeDark ? (
              <button
                onClick={toggleDarkModeButton}
                className="rounded-full px-4 m-2 border  hover:bg-gray-700"
              >
                <LightModeIcon style={{ color: 'white' }} />
              </button>
            ) : (
              <button
                onClick={toggleDarkModeButton}
                className='rounded-full px-4 m-2 border border-black hover:bg-gray-200'
              >
                <DarkModeIcon style={{ color: 'black' }} />
              </button>
            )}
          </div>
          {/* {currentMode === 'text' && canvas && mouseDown ?

            // <textarea  
            //   rows={10} cols={30}
            //   style={{position:'fixed', top: yPointer, left: xPointer}}
            // ></textarea>
            // <h2>Hello Kitty</h2>
            : ''
          } */}
          {urlImage ? (
            <>
              <div
                ref={EditSectionComponentRef}
                className='flex flex-1 justify-center items-center '
              >
                <canvas
                  id="canvas"
                  className='flex flex-1 border border-slate-400'
                >

                </canvas>
              </div>
              <div className='flex justify-center mb-3 mr-3'>
                <button
                  onClick={() => {
                    handleUndoRedo(canvas, 'undo');
                  }}
                  className={clsx(
                    'px-14 py-1 mr-0.5  rounded-l-full',
                    currentThemeDark ? 'border hover:bg-gray-700' : 'border border-black hover:bg-gray-200'
                  )}
                >
                  {currentThemeDark ? (
                    <UndoIcon style={{ color: 'white' }} />
                  ) : (
                    <UndoIcon style={{ color: 'black' }} />
                  )}
                </button>
                <button
                  onClick={() => handleUndoRedo(canvas, 'redo')}
                  className={clsx(
                    'px-14 py-1 rounded-r-full',
                    currentThemeDark ? 'border hover:bg-gray-700' : 'border border-black hover:bg-gray-200'
                  )}
                >
                  {currentThemeDark ? (
                    <RedoIcon style={{ color: 'white' }} />
                  ) : (
                    <RedoIcon style={{ color: 'black' }} />
                  )}
                </button>
              </div>
            </>
          ) : (
            <div
              className={clsx(
                '  mr-5 ml-5 mb-3 content-center border border-slate-400 flex items-center justify-center flex-1',
                currentThemeDark ? 'bg-[#1B1F23]' : 'bg-white'
              )}
            >
              <h1 className='font-semibold text-center text-gray-500'>
                Upload a file to Annotate
              </h1>
            </div>
          )}
        </div>

        <div className={clsx('mb-3  rounded -b-lg mr-1 ml-3 flex justify-center  italic  bg-[#1B1F23]-50 ', (currentThemeDark) ? 'bg-[#1B1F23] text-orange-300 border border-orange-300' : 'bg-white text-orange-400 border border-orange-400', currentMode ? 'border-0' : '')}>
          {urlImage ? (
            showPopup ? (
              <p className={clsx('border-3 bg-green-100  w-full  text-center rounded -b-lg text-green-700 border border-green-600', currentThemeDark ? '' : 'border-green-400 text-green-400')}>
                Image is saved successfully
              </p>
            ) : (
              currentMode ? (
                <p className={clsx('border-2 border-green-200 w-full  text-center rounded -b-lg text-green-200', currentThemeDark ? '' : 'border-green-400 text-green-400')}>
                  {currentMode!.charAt(0).toUpperCase() + currentMode!.slice(1)} mode
                  is active
                </p>
              ) : (

                <p>
                  Chose the editing tools to annotate and select the brush
                  properties
                </p>
              )
            )

          ) : (
            <p className={''}>Upload an image to annotate </p>
          )}

        </div>
      </div></>
  );
};

export default index;
