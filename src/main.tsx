import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/global.css';
import { store } from './redux-state/store/index.tsx';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
