import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface loadImageState {
  imageURL: string | null;
  fileName: string|null;
}

const initialState: loadImageState = {
  imageURL: null,
  fileName: null,
};

export const loadImageSlice = createSlice({
  name: 'loadImage',
  initialState,
  reducers: {
    loadImageURL: (state, action: PayloadAction<string | null>) => {
      state.imageURL = action.payload;
    },
    loadFileName: (state, action) =>{
      state.fileName = action.payload;
    }
  },
});

export const { loadImageURL, loadFileName } = loadImageSlice.actions;

export default loadImageSlice.reducer;
