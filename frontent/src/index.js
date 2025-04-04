import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainContext from './Context/MainContext';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <MainContext>
      <App />
    </MainContext>
  </Provider>
);
