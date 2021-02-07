import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppReducer from './App.reducer';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(<AppReducer />, document.getElementById('root'));

serviceWorker.unregister();
