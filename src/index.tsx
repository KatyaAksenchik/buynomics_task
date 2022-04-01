import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { RootView } from './views/RootView/RootView';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RootView />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
