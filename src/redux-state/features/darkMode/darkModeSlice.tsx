import { createSlice } from '@reduxjs/toolkit';

interface DarkModeState {
  darkMode: boolean;
}

const initialState: DarkModeState = {
  darkMode: false,
};

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;



export default darkModeSlice.reducer;
