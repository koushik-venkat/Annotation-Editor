import { createSlice } from '@reduxjs/toolkit';

interface DrawingState {
  mode: string | null;
  color: string;
  brushSize: number;
  fillShape: boolean;
  save: boolean;
}

const initialState: DrawingState = {
  mode: null,
  color: 'black',
  brushSize: 1,
  fillShape: false,
  save: true,
};

const drawingSlice = createSlice({
  name: 'drawing',
  initialState,
  reducers: {
    mode: (state, action) => {
      state.mode = action.payload;
    },
    changeColor: (state, action) => {
      state.color = action.payload;
    },
    changeBrushSize: (state, action) => {
      state.brushSize = action.payload;
    },
    toggleFillShape: (state) => {
      state.fillShape = !state.fillShape;
    },
    saveImage: (state) => {
      state.save = !state.save;
    },
  },
});

export const {
  mode,
  changeColor,
  changeBrushSize,
  toggleFillShape,
  saveImage,
} = drawingSlice.actions;

export default drawingSlice.reducer;
