import { createSlice } from '@reduxjs/toolkit';


interface DrawingState {
  mode: string | null;
  color: string;
  brushSize: number;
  fillShape: boolean;
  save: boolean;
  annotations: fabric.Object[];
  brightness:number;
  contrast:0,
  historyStack:fabric.Object[];
  saveToggleState: boolean,
}

const initialState: DrawingState = {
  mode: null,
  color: 'black',
  brushSize: 1,
  fillShape: false,
  save: true,
  annotations:[],
  brightness:0,
  contrast:0,
  historyStack:[],
  saveToggleState: true,
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
    addAnnotations: (state, action)=>{
      console.log('start of add annotations method');
      state.annotations.push(action.payload);
      console.log('end of add annotations method');
    },
    popAnnotations:(state)=>{
      if(state.annotations.length){
        state.annotations.pop();
      }
    },
    saveToggle:(state)=>{
      state.saveToggleState = !state.saveToggleState;
    },
    emptyAnnotations: (state) => {
      state.annotations = [];
    },
    changeBrightness: (state, action) =>{
      state.brightness = action.payload;
    },
    changeContrast: (state, action) => {
      state.contrast = action.payload;
    },
    addToHistoryStack: (state, action)=>{
      state.historyStack.push(action.payload);
    },
    popHistoryStack: (state)=>{
      state.historyStack.pop();
    },
    emptyHistoryStack: (state)=>{
      state.historyStack=[];
    }
  },
});

export const {
  mode,
  changeColor,
  changeBrushSize,
  toggleFillShape,
  saveImage,
  addAnnotations,
  emptyAnnotations,
  changeBrightness,
  changeContrast,
  popAnnotations,
  addToHistoryStack,
  popHistoryStack,
  emptyHistoryStack,
  saveToggle,
} = drawingSlice.actions;

export default drawingSlice.reducer;
