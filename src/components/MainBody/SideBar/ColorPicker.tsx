import { useEffect, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import { changeColor } from '../../../redux-state/features/drawing/drawingSlice';
import { RootState } from '../../../redux-state/store';
import { clsx } from 'clsx';
const ColorPicker = () => {
  const [color, setColor] = useState('#000000');
  const dispatch = useDispatch();
  const currentMode = useSelector((state: RootState) => state.drawing.mode);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  useEffect(() => {
    dispatch(changeColor(color));
  }, [color]);

  return (
    <div className="ml-1 mt-1">
      {
        <>
          <div
            className="p-1.5 bg-slate-200 inline-block rounded shadow-lg "
            onClick={handleClick}
          >
            <div
              className={clsx(
                'w-9 h-3.5 rounded-sm cursor-pointer',
                currentMode === null ? 'cursor-not-allowed' : 'cursor-pointer'
              )}
              style={{ backgroundColor: `${color}` }}
            ></div>
          </div>
          {displayColorPicker && currentMode !== null ? (
            <div className="fixed z-9999999999">
              <div className="fixed top-100 left-100 right-0 bottom-0">
                <SketchPicker
                  color={color}
                  onChangeComplete={(color: ColorResult) => {
                    setColor(color.hex);
                  }}
                />
              </div>
            </div>
          ) : null}
        </>
      }
    </div>
  );
};

export default ColorPicker;
