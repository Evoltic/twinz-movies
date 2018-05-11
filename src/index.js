import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <HashRouter basename={process.env.PUBLIC_URL} >
    <Route path='/' component={App} />
  </HashRouter>,
  document.getElementById('root'));

registerServiceWorker();
