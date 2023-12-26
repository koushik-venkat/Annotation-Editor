import React from 'react';
import { fabric } from 'fabric';
import { green } from '@mui/material/colors';

const useRenderText = () => {
  const handleRenderText = (
    canvas: fabric.Canvas
  ) => {
    
    canvas.hoverCursor = 'text';

    // canvas.on('mouse:over', () =>{
    //   canvas.lowerCanvasEl.style.cursor = 'text';
    // });
    // canvas.on('mouse:out', () => setCursorType('default'));
    
    canvas.on('mouse:down', (event: fabric.IEvent<MouseEvent>)=> {
      const pointer = canvas.getPointer(event.e);
      const originX = pointer.x;
      const originY = pointer.y;
      const text = new fabric.Textbox(
        'Type Something',
        {
          selectable: true,
          hoverCursor: 'text',
          left: originX,
          top: originY,
          fontSize: 22,
          strokeWidth: 0.4,
          width:290,
          opacity:1,
          hasBorders:true,
          borderColor: 'red',
          cursorColor: 'pointer',
        }
      );
      canvas.add(text);
    });
    

  };
  return { handleRenderText };


};

export default useRenderText;