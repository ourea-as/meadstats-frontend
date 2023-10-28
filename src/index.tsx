import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { CookiesProvider } from 'react-cookie';

import './index.css';
import App from './app';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <CookiesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>,
);
