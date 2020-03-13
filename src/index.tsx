import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { CookiesProvider } from 'react-cookie';

import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <CookiesProvider>
    <Router>
      <App />
    </Router>
  </CookiesProvider>,
  document.getElementById('root'),
);

serviceWorker.register();
