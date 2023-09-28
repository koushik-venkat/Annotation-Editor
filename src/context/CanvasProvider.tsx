import { ReactNode, useContext, useState } from 'react';
import React from 'react';
import { CanvasContext } from './CanvasContext';

const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  return (
    <CanvasContext.Provider
      value={{ canvas, setCanvas }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasProvider;

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error(
      'useCanvasStateContext must be used within a CanvasStateProvider'
    );
  }
  return context;
};
