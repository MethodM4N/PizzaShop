import React from 'react';
import ReactDOM from 'react-dom/client';
// need to change browserRouter to HashRouter for gh-pages
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

import { store } from './Redux/Store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
