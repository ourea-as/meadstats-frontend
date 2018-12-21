import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-123335075-1', {
  gaOptions: {
    siteSpeedSampleRate: 100
  }
});
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
