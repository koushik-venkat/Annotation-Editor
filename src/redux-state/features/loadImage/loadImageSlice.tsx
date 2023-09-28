import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface loadImageState {
  imageURL: string | null;
}

const initialState: loadImageState = {
  imageURL: null,
};

export const loadImageSlice = createSlice({
  name: 'loadImage',
  initialState,
  reducers: {
    loadImageURL: (state, action: PayloadAction<string | null>) => {
      state.imageURL = action.payload;
    },
  },
});

export const { loadImageURL } = loadImageSlice.actions;

export default loadImageSlice.reducer;
