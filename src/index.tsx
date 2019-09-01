import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './store';

import { CookiesProvider } from 'react-cookie';

import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';

import ReactGA from 'react-ga';

ReactGA.initialize('UA-123335075-1', {
  gaOptions: {
    siteSpeedSampleRate: 100,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register();
