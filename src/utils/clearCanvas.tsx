const clearCanvas = (canvas: fabric.Canvas) => {
  canvas.getObjects().forEach((item) => {
    if (item !== canvas.backgroundImage) {
      canvas.remove(item);
    }
  });
};

export default clearCanvas;
