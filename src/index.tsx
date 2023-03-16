import ReactDOM from 'react-dom/client';
// need to change BrowserRouter to HashRouter for gh-pages
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Favicon from 'react-favicon';
import favicon from './assets/img/pizza-logo.svg';

import { store } from './Redux/Store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <Favicon url={favicon} />
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </>,
);
