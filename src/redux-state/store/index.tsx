import { configureStore } from '@reduxjs/toolkit';
import loadImageReducer from '../features/loadImage/loadImageSlice';
import drawingReducer from '../features/drawing/drawingSlice';
import darkModeReducer from '../features/darkMode/darkModeSlice';

export const store = configureStore({
  reducer: {
    loadImage: loadImageReducer,
    drawing: drawingReducer,
    darkMode: darkModeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
