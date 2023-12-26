import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAnnotations, addToHistoryStack, popAnnotations, popHistoryStack } from '../redux-state/features/drawing/drawingSlice';
import { RootState } from '../redux-state/store';
import { fabric } from 'fabric';

const useHandleUndoRedo = () => {
  const [isRedoing, setIsRedoing] = useState<boolean>(false);
  const dispatch = useDispatch();
  const annotationsArray = useSelector((state: RootState) => state.drawing.annotations);
  const historyStack = useSelector((state: RootState) => state.drawing.historyStack);

  const handleUndoRedo = (canvas: fabric.Canvas | null, condition: 'undo' | 'redo') => {
    if (canvas === null) return;
    if (condition === 'undo') {
      if (annotationsArray.length > 0) {
        const popObject: fabric.Object = canvas._objects[canvas._objects.length - 1];
        canvas._objects.pop();
        dispatch(popAnnotations());
        dispatch(addToHistoryStack(popObject.toJSON([])));
        canvas.renderAll();
      }
    } else if (condition === 'redo') {
      if (historyStack.length > 0) {
        setIsRedoing(true);
        const pushObject = historyStack[historyStack.length - 1];
        dispatch(popHistoryStack());
        dispatch(addAnnotations(pushObject));
        
        if (pushObject.type === 'triangle') {
          const fabricObject = new fabric.Triangle(pushObject);
          canvas.add(fabricObject);
        } else if (pushObject.type === 'rect') {
          const fabricObject = new fabric.Rect(pushObject);
          canvas.add(fabricObject);
        } else if (pushObject.type === 'circle') {
          const fabricObject = new fabric.Circle(pushObject);
          canvas.add(fabricObject);
        } else if (pushObject.type === 'ellipse') {
          const fabricObject = new fabric.Ellipse(pushObject);
          canvas.add(fabricObject);
        } else if (pushObject.type === 'line') {
          const line = new fabric.Line();
          line.angle = pushObject.angle;
          line.backgroundColor = pushObject.backgroundColor;
          line.fill = pushObject.fill;
          line.fillRule = pushObject.fillRule;
          line.flipX = pushObject.flipX;
          line.flipY = pushObject.flipY;
          line.globalCompositeOperation = pushObject.globalCompositeOperation;
          line.height = pushObject.height;
          line.left = pushObject.left;
          line.opacity = pushObject.opacity;
          line.originX = pushObject.originX;
          line.originY = pushObject.originY;
          line.width = pushObject.width;
          line.top = pushObject.top;
          line.visible = true;
          line.stroke = pushObject.stroke;
          canvas.add(line);
        }else if(pushObject.type === 'path'){
          fabric.Path.fromObject(pushObject, function(path:fabric.Path){
            canvas.add(path);
            canvas.renderAll();
          });
        }
        canvas.renderAll();
      }
    }
  };
  return { handleUndoRedo, historyStack, isRedoing, setIsRedoing };
};

export default useHandleUndoRedo;
