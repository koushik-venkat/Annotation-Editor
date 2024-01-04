import { useState } from 'react';
import { fabric } from 'fabric';
// import { positions } from '@mui/system';

interface PointerType {
  x: number,
  y: number,
} 

const useRenderText = () => {

  const [selectedTextbox, setSelectedTextbox] = useState<null | fabric.Group>(null);

  const handleRenderText = (
    canvas: fabric.Canvas
  ) => {
    const handleMouseDown = (event: fabric.IEvent) => {
      const currentObject = event.target as fabric.Group;
      const pointer: PointerType = canvas.getPointer(event.e);
      if (currentObject) {
        console.log('selectedtextbox is  not null');
        renderTextBoxContent(currentObject, pointer);
      }else{
        console.log(pointer);
        createNewTextBox(pointer);
        console.log('selectedtextbox is null');
      }
    };

    const createNewTextBox = (pointer: fabric.IPoint) => {
      const placeHolderText = 'Type something'; 

  

      const placeHolder = new fabric.Rect({
        left: pointer.x,
        top: pointer.y,
        width: 250,
        height: 38,
        stroke: 'white',
        strokeWidth: 2,
        strokeDashArray: [10, 10],
        fill: 'rgba(0, 0, 0, 0.15)',
        rx: 5,
        ry: 5,
        selectable: false,
      });

      const textBox = new fabric.Textbox('', {
        padding: 10,
        left: pointer.x,
        top: pointer.y,
        width: 250,
        height: 38,
        fontSize: 20,
        editable: true,
        fill: 'white' ,
        cornerStyle: 'circle',
      });

      
      
      
      const group = new fabric.Group([placeHolder, textBox], {
        selectable: false,
        lockScalingX: true,
        lockScalingY: true,
        fill: 'white',
        hasControls: false,
        hoverCursor: 'text',
      });

      canvas.add(group);
      canvas.setActiveObject(group);
      setSelectedTextbox(group);
      
      canvas.renderAll();

      // setSelectedTextbox(group);

      const handleTextBoxBlur = () => {
        renderTextBoxContent(group, pointer);
        canvas.on('mouse:down', handleMouseDown);
        textBox.off('blur', handleTextBoxBlur);
      };

      textBox.on('blur', handleTextBoxBlur);
    };

    const renderTextBoxContent = (textBoxGroup: fabric.Group, pointer: PointerType) => {
      
      
      // console.log('this is textbox group ', textBoxGroup.item(1));

      // if (textBoxGroup?.text?.trim() === '' || textBox === undefined) {
      //   canvas.remove(textBox);
      // }else{

      //   console.log('the textbox has some content');
      //   textBox.set({
      //     strokeDashArray: undefined,
      //     hasControls: true,
      //     selectable: true,
      //   });
      //   canvas.renderAll();
      //   console.log('text box is removed');
      //   canvas.remove(textBox);
      // }

      // setSelectedTextbox(null);
    };




    canvas.on('mouse:down', handleMouseDown);


  };
  return { handleRenderText };


};

export default useRenderText;