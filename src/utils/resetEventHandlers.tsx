const resetEventHandlers = (canvas: fabric.Canvas) => {
  canvas.off('mouse:down');
  canvas.off('mouse:up');
  canvas.off('mouse:move');
  canvas.selection = false;
  canvas.setCursor('grab');
};

export default resetEventHandlers;
