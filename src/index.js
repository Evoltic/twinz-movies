import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <BrowserRouter>
    <Route path={process.env.PUBLIC_URL + "/"} component={App} />
  </BrowserRouter>,
  document.getElementById('root'));

registerServiceWorker();
