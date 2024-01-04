import { createContext } from 'react';

type contextType = {
  canvas: fabric.Canvas | null;
  setCanvas: (canvas: fabric.Canvas | null) => void;
};

export const CanvasContext = createContext<contextType | undefined>(undefined);

