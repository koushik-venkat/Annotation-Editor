const saveCanvasAsImage = (canvas: fabric.Canvas | null) => {
  if (canvas === null) return;
  const dataURL = canvas.toDataURL({ format: 'png' });

  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'canvas.png';

  link.click();
};

export default saveCanvasAsImage;
